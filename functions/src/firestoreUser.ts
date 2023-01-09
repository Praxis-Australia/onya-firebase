import { firestore } from "firebase-admin";
import { https } from "firebase-functions";
import { userCollectionRef, userDocConverter } from "./utils/firestore";
import fs = require('fs');
import { User } from "./utils/types/User";

let templateUserDoc: User;

export const createUser = async (uid: string): Promise<void> => {
  if (!templateUserDoc) {
    templateUserDoc = JSON.parse(fs.readFileSync('./templateUserDoc.json', 'utf8'));
  }

  const docRef = userCollectionRef.doc(uid);
  const docSnapshot = await docRef
    .withConverter(userDocConverter)
    .get()
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (docSnapshot.exists) {
    throw new https.HttpsError('already-exists', 'User already exists', docSnapshot.data());
  }

  await docRef.withConverter(userDocConverter).set({
    ...templateUserDoc,
    uid: uid,
    userCreated: firestore.Timestamp.now()
  })
    .catch((err) => {
      throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
    });
}