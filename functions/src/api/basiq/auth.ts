import { https } from 'firebase-functions';
import { BasiqToken } from '../../models/Basiq';
import { basiqTokenConverter, basiqTokenDocRef } from '../../utils/firestore';
import { postAuthToken } from './fetch';

let global_access_token: BasiqToken;

const refreshBasiqToken = async (): Promise<string> => {
  console.log("fetching new basiq token")

  if (!process.env.BASIQ_API_KEY) {
    throw new https.HttpsError('not-found', 'Basiq API key not set in env');
  }

  const { access_token, expires_in } = await postAuthToken(process.env.BASIQ_API_KEY);
  const expires_at  = new Date().getTime() + expires_in * 1000

  console.info(`New token fetched: ${access_token} expiring at ${expires_at}`)

  await basiqTokenDocRef
    .withConverter(basiqTokenConverter)
    .set({
      access_token,
      expires_at
    } as BasiqToken)
    .catch(e => {
      console.error(e);
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
      console.log("returning cached basiq token")
      return latestToken.access_token;
    } else {
      throw new Error("Token expired");
    }
  } catch (err) {
    console.info("Issue fetching existing Basiq token from doc")
    console.info(err)
    return await refreshBasiqToken();
  }
};