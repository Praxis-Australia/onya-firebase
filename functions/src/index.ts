import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
initializeApp();
require("firebase-functions/logger/compat");


import { 
  createUser as createFirestoreUser,
  getBasiqClientToken,
  initBasiqUser,
  refreshBasiqInfo
} from './services/user';

const regionFunctions = functions.region('australia-southeast1')

export const createUser = regionFunctions.auth.user().beforeCreate(async (user) => {
  const { uid } = user;
  await createFirestoreUser(uid);
})

export const createBasiqUser = regionFunctions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  if (!context.auth.token.phone_number) {
    throw new functions.https.HttpsError('unauthenticated', 'You must have a phone number to call this function');
  }

  const { uid } = context.auth;
  const { phone_number } = context.auth.token;
  const { firstName, lastName } = data;

  console.log("creating Basiq user")
  
  await initBasiqUser(uid, phone_number, firstName, lastName);
})

export const refreshUserBasiqInfo = regionFunctions.https.onCall(async (_, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  const { uid } = context.auth;
  await refreshBasiqInfo(uid);
})

export const getClientToken = regionFunctions.https.onCall(async (_, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  const { uid } = context.auth;
  return {
    access_token: await getBasiqClientToken(uid)
  };
})