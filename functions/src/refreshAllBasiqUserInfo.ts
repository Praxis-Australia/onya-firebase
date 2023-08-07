import { onSchedule } from 'firebase-functions/v2/scheduler';
import { Basiq, Db, Logger } from './dependencies';
import { processRoundupTransactions } from './services/roundup';
import { refreshBasiqInfo } from './services/basiq';
import { SecretParam } from 'firebase-functions/lib/params/types';

export const getRefreshAllUsersBasiqInfo = (db: Db, logger: Logger, basiqApiKey: SecretParam) => 
  onSchedule({
    schedule: 'every 12 hours',
    secrets: [basiqApiKey]
  }, async (_) => {
    const basiq = new Basiq(basiqApiKey.value(), db.basiqTokenDocRef);

    return db.userCollectionRef.where('basiq.configStatus', '==', 'COMPLETE').get()
      .then((users) => {  
        users.forEach((userDocSnapshot) => {
          const userDoc = userDocSnapshot.ref.withConverter(db.userConverter);

          const roundupCallback = processRoundupTransactions(
            basiq.createPayrequest, 
            db.onyaTransactionCollectionRef,
            userDoc
          );

          refreshBasiqInfo(
            basiq, 
            userDoc,
            db.getBasiqTransactionCollection(userDocSnapshot.ref),
            true, 
            roundupCallback
          )
            .catch((err) => {
              logger.error(`Error refreshing Basiq info for ${userDocSnapshot.id}`, err);
              throw err;
            })
        });
      })
      .catch((err) => {
        logger.error(`Error refreshing users`, err);
        throw err;
      });
  });