import { HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { BasiqToken } from '../../models/Basiq';
import { basiqTokenConverter, basiqTokenDocRef } from '../../utils/firestore';
import { postAuthToken } from './fetch';

let global_access_token: BasiqToken;

const refreshBasiqToken = async (): Promise<string> => {
  if (!process.env.BASIQ_API_KEY) {
    logger.error(`Basiq API key not set in env`);
    throw new HttpsError('not-found', 'Basiq API key not set in env');
  }

  const { access_token, expires_in } = await postAuthToken(process.env.BASIQ_API_KEY);
  const expires_at  = new Date().getTime() + expires_in * 1000

  logger.info(`Fetched new Basiq token, expires at ${expires_at}`);

  await basiqTokenDocRef
    .withConverter(basiqTokenConverter)
    .set({
      access_token,
      expires_at
    } as BasiqToken)
    .catch(e => {
      logger.error(`Error writing Basiq token to Firestore`, e);
      throw new HttpsError('internal', 'Error writing Basiq token to Firestore', e);
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
        logger.error(`Basiq token not found in Firestore`);
        throw new HttpsError('not-found', 'Basiq token not found in Firestore');
      }
    }

    if (latestToken.expires_at - new Date().getTime() > 5 * 60 * 1000) {
      return latestToken.access_token;
    } else {
      logger.info(`Basiq token expired, fetching new token`);
      throw new Error("Basiq token expired");
    }
  } catch (err) {
    logger.info(`Error fetching Basiq token, fetching new token`);
    return await refreshBasiqToken();
  }
};