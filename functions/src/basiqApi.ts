import { logger, https } from 'firebase-functions';
import basiqCore from '@api/basiq-core';
import basiqData from '@api/basiq-data';

import { basiqTokenConverter, basiqTokenDocRef, userCollectionRef, userDocConverter } from './utils/firestore';
import type { BasiqAccount, BasiqConfig, BasiqConfigComplete, BasiqConfigUserCreated, BasiqToken } from './utils/types/basiq';

const refreshBasiqToken = async (): Promise<string> => {
  logger.log("fetching new basiq token")

  if (!process.env.BASIQ_API_KEY) {
    throw new https.HttpsError('not-found', 'Basiq API key not set in env');
  }

  basiqCore.auth(`Basic ${process.env.BASIQ_API_KEY}`);
  const res = await basiqCore.postToken({scope: 'SERVER_ACCESS'}, {
    accept: 'application/json',
    'basiq-version': '3.0'
  })
    .catch(err => {
      console.error(err);
      throw new https.HttpsError('unavailable', 'Network error connecting with Basiq API', err);
    });

  if (res.status != 200) {
    throw new https.HttpsError('unavailable', 'Error with Basiq API', res.data);
  }

  const { access_token, expires_in } = res.data;
  const expires_at  = new Date().getTime() + expires_in * 1000

  logger.info(`New token fetched: ${access_token} expiring at ${expires_at}`)

  await basiqTokenDocRef
    .withConverter(basiqTokenConverter)
    .set({
      access_token,
      expires_at
    } as BasiqToken)
    .then(res => logger.log(res.writeTime))
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

const createAuthLink = async (basiqUid: string): Promise<string> => {
  basiqCore.auth(await getBasiqToken());
  const res = await basiqCore.postAuthLink({
    userId: basiqUid,
  })
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Basiq API', err);
    });

  if (res.status === 201) return res.data.links!.public;

  if (res.status === 403) {
    throw new https.HttpsError('permission-denied', 'basiq access token does not have permission to access auth link', res.data)
  } 

  if (res.status === 404) {
    throw new https.HttpsError('not-found', 'Specified Basiq user does not exist', res.data);
  }

  throw new https.HttpsError('unknown', "another unkown error with Basiq API", res.data);
}

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

export const getAuthLink = async (basiqUid: string): Promise<string> => {
  basiqCore.auth(await getBasiqToken());
  const res = await basiqCore.getAuthLink({
    userId: basiqUid,
  })
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Basiq API', err);
    });
  
  if (res.status === 200) return res.data.links!.public;

  // If status is 404 and there's an empty response, it means the user doesn't have a valid authlink
  // So we create one and return it
  if (res.status === 404 && !res.headers.get('content-length')) {
    return await createAuthLink(basiqUid);
  }

  if (res.status === 403) {
    throw new https.HttpsError('permission-denied', 'basiq access token does not have permission to access auth link', res.data)
  } 
  if (res.status === 404) {
    throw new https.HttpsError('not-found', 'Specified Basiq user does not exist', res.data);
  }
  throw new https.HttpsError('unknown', "another unkown error with Basiq API", res.data);
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

    basiqCore.auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiJkMTRjYzU5Zi0yM2UzLTQ4NjEtOGJiMi1mZWMwZDcxMWMxMjkiLCJhcHBsaWNhdGlvbmlkIjoiNjMxMjNmMWMtZjYxMy00ZjMyLWFiYzUtYzBhZDdhYTY2YmU1Iiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50Ijp0cnVlLCJjb25uZWN0X3N0YXRlbWVudHMiOmZhbHNlLCJlbnJpY2giOiJkaXNhYmxlZCIsImVucmljaF9lbnRpdHkiOmZhbHNlLCJlbnJpY2hfbG9jYXRpb24iOmZhbHNlLCJlbnJpY2hfY2F0ZWdvcnkiOmZhbHNlLCJhZmZvcmRhYmlsaXR5Ijoic2FuZGJveCIsImluY29tZSI6InNhbmRib3giLCJleHBlbnNlcyI6InNhbmRib3giLCJleHAiOjE2NzMyNTU0MzQsImlhdCI6MTY3MzI1MTgzNCwidmVyc2lvbiI6IjMuMCIsImRlbmllZF9wZXJtaXNzaW9ucyI6W119.0VW3vJIP2dBCHtnwnPPvH6dnqM42BWBRZnv6RUfHaTk")
    const res = await basiqCore.createUser({
      mobile,
      ...email ? {email} : {},
      ...firstName ? {firstName} : {},
      ...lastName ? {lastName} : {}
    })
    .catch(err => {
      console.error(err);
      throw new https.HttpsError('unavailable', 'Network error connecting with Basiq API', err);
    });
    
    if (res.status === 201) {
      // Ideally we'd use .update() so we can only update field as needed
      // But because of nodejs-firestore issue #1745, it's not typesafe
      // So as a workaround we use .set() with already fetched data
      await userCollectionRef.doc(uid)
        .set({
          ...user,
          basiq: {
            configStatus: 'BASIQ_USER_CREATED',
            uid: res.data.id,
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