import { HttpsError, onCall } from "firebase-functions/v2/https";
import { Basiq, Db, Logger } from "./dependencies";
import { refreshBasiqInfo } from "./services/basiq";
import { processRoundupTransactions } from "./services/roundup";
import { SecretParam } from "firebase-functions/lib/params/types";

export const getRefreshUserBasiqInfo = (db: Db, logger: Logger, basiqApiKey: SecretParam) => onCall({ 
  secrets: [basiqApiKey]
}, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'You must be logged in to call this function');
    }

    const basiq = new Basiq(basiqApiKey.value(), db.basiqTokenDocRef);
  
    const { uid } = request.auth;
    const userDoc = db.userCollectionRef.doc(uid)
    const userBasiqTransactions = db.getBasiqTransactionCollection(userDoc);
    const roundupCallback = processRoundupTransactions(
      basiq.createPayrequest, 
      db.onyaTransactionCollectionRef,
      userDoc
    );

    return refreshBasiqInfo(basiq, userDoc, userBasiqTransactions, true, roundupCallback)
      .then(() => {
        logger.log(`Refreshed Basiq info for ${uid}`);
      })
      .catch((err) => {
        logger.error(`Error refreshing Basiq info for ${uid}`, err);
        throw err;
      });
  })