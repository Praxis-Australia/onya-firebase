import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fs = require('fs');
import * as basiqApi from './basiqApi';
import { userCollectionRef, userDocConverter } from './utils/firestore';

let templateUserDoc = JSON.parse(fs.readFileSync('./templateUserDoc.json', 'utf8'));

admin.initializeApp();

const createUser = async (uid: string): Promise<void> => {
  const docRef = userCollectionRef.doc(uid);
  const docSnapshot = await docRef
    .withConverter(userDocConverter)
    .get()
    .catch(err => {
      throw new functions.https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (docSnapshot.exists) {
    throw new functions.https.HttpsError('already-exists', 'User already exists', docSnapshot.data());
  }

  await docRef.withConverter(userDocConverter).set({
    ...templateUserDoc,
    uid: uid,
    userCreated: admin.firestore.Timestamp.now()
  })
    .catch((err) => {
      throw new functions.https.HttpsError('internal', 'Error writing user to Firestore', err);
    });
}

exports.createUser = functions.auth.user().beforeCreate(async (user) => {
  const { uid } = user;
  await createUser(uid);
})

exports.createBasiqUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  if (!context.auth.token.phone_number) {
    throw new functions.https.HttpsError('unauthenticated', 'You must have a phone number to call this function');
  }

  const { uid } = context.auth;
  const { phone_number } = context.auth.token;
  const { firstName, lastName } = data;
  
  await basiqApi.createBasiqUser(uid, phone_number, firstName, lastName);
})

exports.refreshUserBasicInfo = functions.https.onCall(async (_, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to call this function');
  }

  const { uid } = context.auth;
  await basiqApi.refreshUserBasicInfo(uid);
})