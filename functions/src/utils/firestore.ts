import { firestore } from 'firebase-admin';
import { https } from 'firebase-functions/v1';
import { BasiqToken, isBasiqToken } from './types/basiq';
import { User, isUser } from './types/user';

export const basiqTokenDocRef = firestore().collection('env').doc('basiqToken') as firestore.DocumentReference<BasiqToken>;

export const basiqTokenConverter: firestore.FirestoreDataConverter<BasiqToken> = {
  toFirestore(basiqToken: BasiqToken): FirebaseFirestore.DocumentData {
    return { ...basiqToken };
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): BasiqToken {
    const data = snapshot.data();
    if (!isBasiqToken(data)) {
      throw new https.HttpsError('failed-precondition', 'The document is not a valid BasiqToken');
    } else {
      return { ...data };
    }
  }
}

export const userCollectionRef = firestore().collection('users') as firestore.CollectionReference<User>;

export const userDocConverter: firestore.FirestoreDataConverter<User> = {
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return { 
      ...user,
      userCreated: firestore.Timestamp.fromDate(user.userCreated),
    };
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): User {  
    const data = snapshot.data();
    if (!isUser(data)) {
      throw new https.HttpsError('failed-precondition', 'The document is not a valid BasiqToken');
    } else {
      return { ...data };
    }
  }
}

// export const basiqConfigConverter: firestore.FirestoreDataConverter<BasiqConfig> = {
//   toFirestore(basiqConfig: BasiqConfig): FirebaseFirestore.DocumentData {
//     return {
//       ...basiqConfig
//     };
//   },
//   fromFirestore(snapshot: firestore.QueryDocumentSnapshot): BasiqConfig {
//     const data = snapshot.data();
//     if (!isBasiqConfig(data)) {
//       throw TypeError('The document is not a valid BasiqConfig');
//     };
//     return {
//       ...data
//     }
//   }
// }