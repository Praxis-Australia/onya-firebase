import { logger, https } from 'firebase-functions';
import basiqCore from '@api/basiq-core';
import basiqData from '@api/basiq-data';
import { basiqTokenConverter, basiqTokenDocRef, userCollectionRef, userDocConverter } from './utils/firestore';
import type { BasiqAccount, BasiqConfig, BasiqConfigComplete, BasiqConfigUserCreated, BasiqToken } from './utils/types/Basiq';

const fetchToken = async (userId?: string) => {
  if (!process.env.BASIQ_API_KEY) {
    throw new https.HttpsError('not-found', 'Basiq API key not set in env');
  }

  const url = 'https://au-api.basiq.io/token';
  const encodedParams = new URLSearchParams();
  if (userId) {
    encodedParams.set('scope', 'CLIENT_ACCESS');
    encodedParams.set('userId', userId)
  } else {
    encodedParams.set('scope', 'SERVER_ACCESS')
  }

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'basiq-version': '3.0',
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${process.env.BASIQ_API_KEY}`
    },
    body: encodedParams
  };
  
  const res = await fetch(url, options)
    .catch(err => {
      throw new https.HttpsError("unknown", "Error while calling Basiq API", err.message)
    });
  
  const data = await res.json()
    .catch(err => {
      throw new https.HttpsError("internal", "Error converting body to JSON", err.message)
    })

  if (res.status !== 200) {
    throw new https.HttpsError("unknown", "Error response from Basiq API", {
      status: res.status,
      body: data
    })
  }

  console.log(data.access_token);

  return {
    access_token: data.access_token as string,
    expires_in: data.expires_in as number
  }
}

const refreshBasiqToken = async (): Promise<string> => {
  logger.log("fetching new basiq token")

  // WORKAROUND: api@5 doesn't work with .auth for some reason
  // So we're using just a node-fetch as a work-around
  const data = await fetchToken();
  // basiqCore.auth(`Basic ${process.env.BASIQ_API_KEY}`);
  // const data = await basiqCore.postToken({scope: 'SERVER_ACCESS'}, {
  //   // accept: 'application/json',
  //   'basiq-version': '3.0'
  // })
  //   .then(res => res.data)
  //   .catch(err => {
  //     console.error(err);
  //     if (err.name === 'FetchError') {
  //       throw new https.HttpsError("unknown", "Error response from Basiq API", err)
  //     }
  //     throw new https.HttpsError("unknown", "Error while calling Basiq API", err.message)
  //   }) as PostTokenResponse200;

  const { access_token, expires_in } = data

  const expires_at  = new Date().getTime() + expires_in * 1000

  logger.info(`New token fetched: ${access_token} expiring at ${expires_at}`)

  await basiqTokenDocRef
    .withConverter(basiqTokenConverter)
    .set({
      access_token,
      expires_at
    } as BasiqToken)
    .catch(e => {
      logger.error(e);
      throw new https.HttpsError('internal', 'Error writing Basiq token to Firestore', e);
    })

  return access_token;
}

const getBasiqToken = async () => {
  try {
    const docSnapshot = await basiqTokenDocRef.get();

    if (docSnapshot.exists) {
      const basiqToken = docSnapshot.data() as BasiqToken;

      if (new Date().getTime() - basiqToken.expires_at < 300 * 1000) {
        logger.log("returning cached basiq token")
        return basiqToken.access_token;
      } else {
        throw new Error("Token expired");
      }
    } else {
      throw new Error("Token doc not found");
    }
  } catch (err) {
    logger.info("Issue fetching existing Basiq token from doc")
    logger.info(err)
    return await refreshBasiqToken();
  }
};

const getConnectionIds = async (basiqUid: string): Promise<Array<string>> => {
  basiqData.auth(await getBasiqToken());
  const res = await basiqData.getConnections({userId: basiqUid})
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Basiq API', err);
    });

  if (res.status === 200) {
    return res.data.data!.map(connection => connection.id);
  }

  if (res.status === 403) {
    throw new https.HttpsError('permission-denied', 'basiq access token does not have permission to access auth link', res.data)
  } 
  if (res.status === 404) {
    throw new https.HttpsError('not-found', 'Specified Basiq user does not exist', res.data);
  }
  throw new https.HttpsError('unknown', "another unkown error with Basiq API", res.data);
}

const getAccounts = async (basiqUid: string): Promise<Array<BasiqAccount>> => {
  basiqData.auth(await getBasiqToken());
  const res = await basiqData.getAccounts({
    userId: basiqUid
  })

  if (res.status === 200) {
    return res.data.data
      .filter(account => account["status"] == "available")
      .map(account => ({
        id: account["id"],
        name: account["name"],
        institution: account["institution"],
        accountNumber: account["accountNo"],
      } as BasiqAccount))
  }

  if (res.status === 403) {
    throw new https.HttpsError('permission-denied', 'basiq access token does not have permission to access auth link', res.data)
  } 
  if (res.status === 404) {
    throw new https.HttpsError('not-found', 'Specified Basiq user does not exist', res.data);
  }
  throw new https.HttpsError('unknown', "another unkown error with Basiq API", res.data);
}

export const getClientToken = async (uid: string): Promise<string> => {
  const userRef = userCollectionRef.doc(uid);
  const userSnapshot = await userRef
    .withConverter(userDocConverter)
    .get()
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });
    
  if (!userSnapshot.exists) {
    throw new https.HttpsError('not-found', 'User document does not exist in Firestore');
  }
  
  const user = userSnapshot.data()!;

  if (user.basiq.configStatus === "NOT_CONFIGURED") {
    throw new https.HttpsError('failed-precondition', 'A Basiq user has not been created for this user');
  }

  const clientToken = user.basiq.clientToken;

  if (new Date().getTime() - clientToken.expires_at < 300 * 1000) {
    logger.log("returning cached basiq client token")
    return clientToken.access_token;
  } else {
    const { access_token, expires_in } = await fetchToken(user.basiq.uid);
    const expires_at  = new Date().getTime() + expires_in * 1000

    await userRef
      .withConverter(userDocConverter)
      .set({
        basiq: {
          ...user.basiq,
          clientToken: {
            access_token,
            expires_at
          }
        }
      }, { merge: true })

    return access_token;
  }
}

export const initBasiqUser = 
  async (uid: string, mobile: string, firstName?: string, lastName?: string, email?: string, allowOverwrite=false): Promise<void> => {
    const userSnapshot = await userCollectionRef.doc(uid).get()
      .catch(err => {
        throw new https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
      });
      
    if (!userSnapshot.exists) {
      throw new https.HttpsError('not-found', 'User document does not exist in Firestore');
    }
    
    // Throws https.HTTPError is the doc doesn't match User type
    const user = userSnapshot.data()!;

    if (!allowOverwrite && user.basiq.configStatus !== 'NOT_CONFIGURED') {
      throw new https.HttpsError('already-exists', 'A Basiq user has already been created for this user');
    }

    basiqCore.auth(await getBasiqToken())
    const res = await basiqCore.createUser({
      mobile,
      ...email ? {email} : {},
      ...firstName ? {firstName} : {},
      ...lastName ? {lastName} : {}
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
        throw new https.HttpsError('unavailable', 'Network error connecting with Basiq API', err);
      });
    
    if (res.status === 201) {
      // Ideally we'd use .update() so we can only update field as needed
      // But because of nodejs-firestore issue #1745, it's not typesafe
      // So as a workaround we use .set() with already fetched data
      const { access_token, expires_in } = await fetchToken(res.data.id);
      const expires_at  = new Date().getTime() + expires_in * 1000

      await userCollectionRef.doc(uid)
        .set({
          ...user,
          basiq: {
            configStatus: 'BASIQ_USER_CREATED',
            uid: res.data.id,
            clientToken: {
              access_token,
              expires_at
            }
          }
        })
        .catch((err) => {
          throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
        });
    }

    if (res.status === 400) {
      throw new https.HttpsError('invalid-argument', 'Invalid arguments passed to Basiq API', res.data);
    }
    if (res.status === 403) {
      throw new https.HttpsError('permission-denied', 'basiq token is invalid', res.data)
    } 
    throw new https.HttpsError('unknown', "another unkown error with Basiq API", res.data);
}
export const refreshUserBasiqInfo = async (uid: string): Promise<void> => {
  const userSnapshot = await userCollectionRef.doc(uid)
    .withConverter(userDocConverter)
    .get()
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (!userSnapshot.exists) {
    throw new https.HttpsError('not-found', 'User document does not exist in Firestore');
  }

  // Throws https.HTTPError is the doc doesn't match User type
  const user = userSnapshot.data()!;

  if (user.basiq.configStatus === "NOT_CONFIGURED") {
    throw new https.HttpsError('failed-precondition', 'A Basiq user has not been created for this user');
  }

  const connectionIds = await getConnectionIds(user.basiq.uid);
  const availableAccounts = await getAccounts(user.basiq.uid);

  let updatedBasiqConfig: BasiqConfig;
  if (connectionIds.length) {
    updatedBasiqConfig = {
      configStatus: "BASIQ_USER_CREATED",
      uid: user.basiq.uid,
    } as BasiqConfigUserCreated
  } else {
    updatedBasiqConfig = {
      configStatus: "COMPLETE",
      uid: user.basiq.uid,
      connectionIds,
      availableAccounts,
    } as BasiqConfigComplete
  }

  await userCollectionRef.doc(uid)
    .withConverter(userDocConverter)
    .set(
      { basiq: updatedBasiqConfig }, 
      { merge: true })
    .catch((err) => {
      throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
    });
}