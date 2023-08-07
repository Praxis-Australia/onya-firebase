import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { Basiq, Db, Logger } from './dependencies';
import { initBasiqUser } from './services/basiq';
import { SecretParam } from 'firebase-functions/lib/params/types';

interface CreateBasiqUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export const getCreateBasiqUser = (db: Db, logger: Logger, basiqApiKey: SecretParam) => onCall({ 
  secrets: [basiqApiKey]
}, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  if (!request.auth.token.phone_number) {
    throw new HttpsError('permission-denied', 'You must have a phone number to call this function');
  }

  if (!request.data || typeof request.data !== 'object') {
    throw new HttpsError('invalid-argument', 'Request data must be an object');
  }

  if (typeof request.data.firstName !== 'string') {
    throw new HttpsError('invalid-argument', 'Request data must contain a firstName string');
  }

  if (typeof request.data.lastName !== 'string') {
    throw new HttpsError('invalid-argument', 'Request data must contain a lastName string');
  }

  if (typeof request.data.email !== 'string') {
    throw new HttpsError('invalid-argument', 'Request data must contain a email string');
  }

  if (!request.data.email.match(/.+@.+\..+/)) {
    throw new HttpsError('invalid-argument', 'Request data contains an invalid email');
  }

  const { uid } = request.auth;
  const { phone_number } = request.auth.token;
  const { firstName, lastName, email } = request.data as CreateBasiqUserRequest;

  const userDoc = db.userCollectionRef.doc(uid)

  const basiq = new Basiq(basiqApiKey.value(), db.basiqTokenDocRef)

  return initBasiqUser(basiq, userDoc, phone_number, email, firstName, lastName)
    .then(() => {
      logger.log(`Created Basiq user for ${uid}`);
    })
    .catch((err) => {
      logger.error(`Error creating Basiq user for ${uid}`, err);
      throw err;
    });
})