import basiqCore from '@api/basiq-core';
import { CreateUserResponse201 } from '@api/basiq-core/types';
import basiqData from '@api/basiq-data';
import { GetAccountsResponse200, GetConnectionsResponse200 } from '@api/basiq-data/types';
import { https, logger } from 'firebase-functions';
import type { BasiqAccount, BasiqToken } from '../models/Basiq';
import { basiqTokenConverter, basiqTokenDocRef } from '../utils/firestore';

let global_access_token: BasiqToken;

export const fetchToken = async (basiqUid?: string) => {
  if (!process.env.BASIQ_API_KEY) {
    throw new https.HttpsError('not-found', 'Basiq API key not set in env');
  }

  const url = 'https://au-api.basiq.io/token';
  const encodedParams = new URLSearchParams();
  if (basiqUid) {
    encodedParams.set('scope', 'CLIENT_ACCESS');
    encodedParams.set('userId', basiqUid)
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

  const data = await fetchToken();

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

export const getBasiqToken = async () => {
  try {
    let latestToken: BasiqToken;
    if (global_access_token) {
      latestToken = global_access_token;
    } else {
      const docSnapshot = await basiqTokenDocRef.get();
      if (docSnapshot.exists) {
        latestToken = docSnapshot.data() as BasiqToken;
      } else {
        throw new Error("Token doc not found");
      }
    }

    if (new Date().getTime() - latestToken.expires_at < 300 * 1000) {
      logger.log("returning cached basiq token")
      return latestToken.access_token;
    } else {
      throw new Error("Token expired");
    }
  } catch (err) {
    logger.info("Issue fetching existing Basiq token from doc")
    logger.info(err)
    return await refreshBasiqToken();
  }
};

export const getConnectionIds = async (basiqUid: string): Promise<Array<string>> => {
  basiqData.auth(await getBasiqToken());
  const data = await basiqData.getConnections({userId: basiqUid})
    .then(res => res.data)
    .catch(err => {
      if (err.name === 'FetchError') {
        if (err.status === 403) {
          throw new https.HttpsError('permission-denied', 'basiq access token does not have permission to this endpoint', err.data)
        } 
        if (err.status === 404) {
          throw new https.HttpsError('not-found', 'Specified Basiq user does not exist', err.data);
        }
        throw new https.HttpsError('unknown', "Unkown error response from Basiq API", err.data);
      }
      throw new https.HttpsError("unknown", "Error while calling Basiq API", err.message)
    }) as GetConnectionsResponse200;

    return data.data!.map(connection => connection.id);
}

export const getAccounts = async (basiqUid: string): Promise<Array<BasiqAccount>> => {
  basiqData.auth(await getBasiqToken());
  const data = await basiqData.getAccounts({
    userId: basiqUid
  })
    .then(res => res.data)
    .catch(err => {
      if (err.name === 'FetchError') {
        if (err.status === 403) {
          throw new https.HttpsError('permission-denied', 'basiq access token does not have permission to this endpoint', err.data)
        } 
        if (err.status === 404) {
          throw new https.HttpsError('not-found', 'Specified Basiq user does not exist', err.data);
        }
        throw new https.HttpsError('unknown', "Unkown error response from Basiq API", err.data);
      }
      throw new https.HttpsError("unknown", "Error while calling Basiq API", err.message)
    }) as GetAccountsResponse200;

    return data.data
      .filter(account => account["status"] == "available")
      .map(account => ({
        id: account["id"],
        name: account["name"],
        institution: account["institution"],
        accountNumber: account["accountNo"],
      } as BasiqAccount));
}

export const createUser = async (mobile: string, firstName?: string, lastName?: string, email?: string) => {
  basiqCore.auth(await getBasiqToken())
  return await basiqCore.createUser({
    mobile,
    ...email ? {email} : {},
    ...firstName ? {firstName} : {},
    ...lastName ? {lastName} : {}
  })
    .then(res => res.data)
    .catch(err => {
      if (err.name === 'FetchError') {
        if (err.status === 400) {
          throw new https.HttpsError('invalid-argument', 'Invalid arguments passed to Basiq API', err.data);
        }
        if (err.status === 403) {
          throw new https.HttpsError('permission-denied', 'basiq token is invalid', err.data)
        } 
        throw new https.HttpsError('unknown', "Unkown error response from Basiq API", err.data);
      }
      throw new https.HttpsError("unknown", "Error while calling Basiq API", err.message)
    }) as CreateUserResponse201;
}