import { firestore } from "firebase-admin";
import { https } from "firebase-functions";
import { userCollectionRef, userDocConverter } from "./utils/firestore";

let templateUserDoc = {
  "basiq":{
      "configStatus":"NOT_CONFIGURED"
  },
  "charitySelection":{},
  "firstName": null,
  "lastName": null,
  "roundup":{
      "config":{
          "debitAt":10,
          "debitAccountId":null,
          "isEnabled":false,
          "roundTo": null,
          "watchedAccountId": null
      },
      "nextDebit":{
          "accAmount":0,
          "lastChecked":null
      },
      "statistics":{
          "total":0
      }
  },
  "transactions":[],
  "uid": "",
  "userCreated": null
}

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

  await docRef.set({
    ...templateUserDoc,
    uid: uid,
    userCreated: firestore.Timestamp.now()
  })
    .catch((err) => {
      throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
    });
}