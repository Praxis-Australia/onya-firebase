import { HttpsError, onCall } from "firebase-functions/v2/https";
import { Basiq, Db, Logger } from "./dependencies";
import { getBasiqClientToken } from "./services/basiq";
import { SecretParam } from "firebase-functions/lib/params/types";

export const getFetchClientToken = (db: Db, logger: Logger, basiqApiKey: SecretParam) => onCall({ 
  secrets: [basiqApiKey]
}, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'You must be logged in to call this function');
    }
    
    const basiq = new Basiq(basiqApiKey.value(), db.basiqTokenDocRef);
    const { uid } = request.auth;
    const userDoc = db.userCollectionRef.doc(uid);
    
    return getBasiqClientToken(basiq, userDoc).
      catch((err) => {
        logger.error(`Error getting client token for ${uid}`, err);
        throw err;
      });
  })