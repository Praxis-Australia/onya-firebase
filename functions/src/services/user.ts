import { https } from 'firebase-functions';
import { userCollectionRef, userDocConverter } from "../utils/firestore";
import { 
  createUser as createBasiqUser,  
  listAccountsIdName, 
  listConnectionIds,
  postClientAuthToken
} from '../api/basiq';
import type { BasiqConfig, BasiqConfigComplete, BasiqConfigUserCreated } from '../models/User';


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
    roundup:{
        config:{
            debitAt:10,
            debitAccountId:null,
            isEnabled:false,
            roundTo: null,
            watchedAccountId: null
        },
        nextDebit:{
            accAmount:0,
            lastChecked:null
        },
        statistics:{
            total:0
        }
    },
    transactions:[],
    uid: uid,
    userCreated: new Date()
  })
    .catch((err) => {
      throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
    });
}

export const getBasiqClientToken = async (uid: string): Promise<string> => {
  const userRef = userCollectionRef.doc(uid);
  const userSnapshot = await userRef
    .withConverter(userDocConverter)
    .get()
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });
    
  if (!userSnapshot.exists) {
    throw new https.HttpsError('not-found', 'User document does not exist in Firestore');
  }
  
  const user = userSnapshot.data()!;

  if (user.basiq.configStatus === "NOT_CONFIGURED") {
    throw new https.HttpsError('failed-precondition', 'A Basiq user has not been created for this user');
  }

  const clientToken = user.basiq.clientToken;

  if (new Date().getTime() - clientToken.expires_at < 300 * 1000) {
    console.log("returning cached basiq client token")
    return clientToken.access_token;
  } else {
    const { access_token, expires_at } = await postClientAuthToken(user.basiq.uid);

    await userRef
      .withConverter(userDocConverter)
      .set({
        ...user,
        basiq: {
          ...user.basiq,
          clientToken: {
            access_token,
            expires_at
          }
        }
      })

    return access_token;
  }
}

export const initBasiqUser = 
  async (uid: string, mobile: string, firstName?: string, lastName?: string, email?: string, allowOverwrite=false): Promise<void> => {
    const userSnapshot = await userCollectionRef.doc(uid).get()
      .catch(err => {
        throw new https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
      });
      
    if (!userSnapshot.exists) {
      throw new https.HttpsError('not-found', 'User document does not exist in Firestore');
    }
    
    // Throws https.HTTPError is the doc doesn't match User type
    const user = userSnapshot.data()!;

    if (!allowOverwrite && user.basiq.configStatus !== 'NOT_CONFIGURED') {
      throw new https.HttpsError('already-exists', 'A Basiq user has already been created for this user');
    }

    const data = await createBasiqUser(mobile, firstName, lastName, email);
    
    // Ideally we'd use .update() so we can only update field as needed
    // But because of nodejs-firestore issue #1745, it's not typesafe
    // So as a workaround we use .set() with already fetched data
    const { access_token, expires_at } = await postClientAuthToken(data.id);

    await userCollectionRef.doc(uid)
      .set({
        ...user,
        basiq: {
          configStatus: 'BASIQ_USER_CREATED',
          uid: data.id,
          clientToken: {
            access_token,
            expires_at
          }
        }
      })
      .catch((err) => {
        throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
      });
}

export const refreshBasiqInfo = async (uid: string): Promise<void> => {
  const userSnapshot = await userCollectionRef.doc(uid)
    .withConverter(userDocConverter)
    .get()
    .catch(err => {
      throw new https.HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (!userSnapshot.exists) {
    throw new https.HttpsError('not-found', 'User document does not exist in Firestore');
  }

  // Throws https.HTTPError is the doc doesn't match User type
  const user = userSnapshot.data()!;

  if (user.basiq.configStatus === "NOT_CONFIGURED") {
    throw new https.HttpsError('failed-precondition', 'A Basiq user has not been created for this user');
  }

  const connectionIds = await listConnectionIds(user.basiq.uid);
  const availableAccounts = await listAccountsIdName(user.basiq.uid);

  let updatedBasiqConfig: BasiqConfig;
  if (connectionIds.length) {
    updatedBasiqConfig = {
      configStatus: "COMPLETE",
      uid: user.basiq.uid,
      connectionIds,
      availableAccounts,
      clientToken: user.basiq.clientToken
    } as BasiqConfigComplete
  } else {
    updatedBasiqConfig = {
      configStatus: "BASIQ_USER_CREATED",
      uid: user.basiq.uid,
      clientToken: user.basiq.clientToken
    } as BasiqConfigUserCreated
  }

  await userCollectionRef.doc(uid)
    .withConverter(userDocConverter)
    .set({
      ...user,
      basiq: updatedBasiqConfig
    })
    .catch((err) => {
      throw new https.HttpsError('internal', 'Error writing user to Firestore', err);
    });
}