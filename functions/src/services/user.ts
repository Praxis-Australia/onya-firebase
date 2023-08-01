import { https } from 'firebase-functions';
import { userCollectionRef, userDocConverter } from "../utils/firestore";


export const createUser = async (uid: string): Promise<void> => {
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
      throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
    });
}