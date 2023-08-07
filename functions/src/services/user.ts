import { logger } from "firebase-functions";
import { HttpsError } from "firebase-functions/v2/https";
import { CollectionReference } from "firebase-admin/firestore";
import { User } from "../models/User";

// Create a UserService class which is exported
export const createUser = async (userCollection: CollectionReference<User>, uid: string) => {
  const docRef = userCollection.doc(uid);
  const docSnapshot = await docRef
    .get()
    .catch(err => {
      logger.error(`Error fetching user from Firestore`, err);
      throw new HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (docSnapshot.exists) {
    throw new HttpsError('already-exists', 'User already exists', docSnapshot.data());
  }

  await docRef.set({
    basiq:{
      configStatus: "NOT_CONFIGURED"
    },
    charitySelection : new Map<string, number>(),
    firstName: null,
    lastName: null,
    donationMethods: {
      roundup: {
        debitAt: 1000,
        debitAccountId:null,
        isEnabled:false,
        roundTo: null,
        watchedAccountId: null
      },
      nextDebit: {
        accruedAmount: 0,
        donationSources: []
      }
    },
    uid: uid,
    userCreated: new Date(),
    email: null
  })
    .catch((err) => {
      logger.error(`Error writing user to Firestore`, err);
      throw new HttpsError('internal', 'Error writing user to Firestore', err);
    });
}