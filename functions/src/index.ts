import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { AuthBlockingEvent, beforeUserCreated } from 'firebase-functions/v2/identity';
import { logger } from 'firebase-functions';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import { initializeApp } from 'firebase-admin/app';

import { 
    createUser as createFirestoreUser,
} from './services/user';
import {
    getBasiqClientToken,
    initBasiqUser,
    refreshBasiqInfo
} from './services/basiq';
import { processRoundupTransactions } from './services/roundup';
import { userCollectionRef } from './utils/firestore';

setGlobalOptions({ region: 'australia-southeast1' });

initializeApp();

export const createUser = beforeUserCreated(async (event: AuthBlockingEvent) => {
  const { uid } = event.data;
  return createFirestoreUser(uid)
    .then(() => {
      logger.log(`Created user ${uid}`)
    })   
    .catch((err) => {
      logger.error(`Error creating user ${uid}`, err)
      throw err;
    });
})

export const createBasiqUser = onCall(async (request) => {
    console.log("HELLO");
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  if (!request.auth.token.phone_number) {
    throw new HttpsError('permission-denied', 'You must have a phone number to call this function');
  }

  const { uid } = request.auth;
  const { phone_number } = request.auth.token;
  const { firstName, lastName, email } = request.data;

  return initBasiqUser(uid, phone_number, firstName, lastName, email)
    .then(() => {
      logger.log(`Created Basiq user for ${uid}`);
    })
    .catch((err) => {
      logger.error(`Error creating Basiq user for ${uid}`, err);
      throw err;
    });
})

export const refreshUserBasiqInfo = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  const { uid } = request.auth;
  return refreshBasiqInfo(uid, true, processRoundupTransactions)
    .then(() => {
      logger.log(`Refreshed Basiq info for ${uid}`);
    })
    .catch((err) => {
      logger.error(`Error refreshing Basiq info for ${uid}`, err);
      throw err;
    });
})

export const getClientToken = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  const { uid } = request.auth;
  return getBasiqClientToken(uid).
    catch((err) => {
      logger.error(`Error getting client token for ${uid}`, err);
      throw err;
    });
})

export const refreshAllUsersBasiqInfo = onSchedule('every 12 hours', async (_) => {
  return userCollectionRef.where('basiq.configStatus', '==', 'COMPLETE').get()
    .then((users) => {    
      for (const user of users.docs) {
        const userData = user.data();
        refreshBasiqInfo(userData.uid, true, processRoundupTransactions)
          .catch((err) => {
            logger.error(`Error refreshing Basiq info for ${userData.uid}`, err);
            throw err;
          })
      }
    })
    .catch((err) => {
      logger.error(`Error refreshing users`, err);
      throw err;
    });
});