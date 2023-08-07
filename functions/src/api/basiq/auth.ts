import { HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { BasiqAuthToken } from '../../models/Basiq';
import { postAuthToken } from './fetch';
import { DocumentReference } from 'firebase-admin/firestore';

const refreshBasiqToken = async (
  basiqApiKey: string, 
  authTokenDoc?: DocumentReference<BasiqAuthToken>
): Promise<BasiqAuthToken> => {
  const { access_token, expires_in } = await postAuthToken(basiqApiKey);
  const expires_at  = new Date().getTime() + expires_in * 1000

  if (typeof authTokenDoc !== 'undefined') {
    await authTokenDoc
      .set({
        access_token,
        expires_at
      } as BasiqAuthToken)
      .catch(e => {
        logger.error(`Error writing Basiq token to Firestore`, e);
        throw new HttpsError('internal', 'Error writing Basiq token to Firestore', e);
      })
  }

  return {
    access_token,
    expires_at
  };
}

export const getBasiqAuthToken = async (
  basiqApiKey: string, 
  authTokenDoc?: DocumentReference<BasiqAuthToken>
): Promise<BasiqAuthToken> => {
  if (typeof authTokenDoc === 'undefined') {
    return refreshBasiqToken(basiqApiKey);
  }

  const docSnapshot = await authTokenDoc.get();
  if (!docSnapshot.exists) {
    return refreshBasiqToken(basiqApiKey, authTokenDoc);
  }
  
  const latestToken = docSnapshot.data()!;
  const isAuthTokenValid = latestToken.expires_at - new Date().getTime() > 5 * 60 * 1000;
  if (!isAuthTokenValid) {
    return refreshBasiqToken(basiqApiKey, authTokenDoc);
  } else {
    return latestToken;
  }
};