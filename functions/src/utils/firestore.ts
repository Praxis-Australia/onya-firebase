import { firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import { BasiqToken } from './types/Basiq';
import { Roundup, RoundupConfig, User } from './types/User';

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

export const userCollectionRef = firestore().collection('users');

export const userDocConverter: firestore.FirestoreDataConverter<User> = {
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return { 
      ...user
    };
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): User {  
    const data = snapshot.data();
    if (!isUser(data)) {
      throw new https.HttpsError('failed-precondition', 'The document is not a valid User');
    } else {
      return { ...data };
    }
  }
}

// # Checks to validate that the Firebase docs can be typed

export function isBasiqToken(obj: any): obj is BasiqToken {
  try {
    return (typeof obj.access_token === 'string' && 
            typeof obj.expires_at === 'number')
  } catch (_) {
    return false;
  }
}

function isUser(obj: any): obj is User {
  try {
    return (isBasiqConfig(obj.basiq) &&
            Object.values(obj.charitySelection).every(value => typeof value === 'number') &&
            (obj.firstName === null || typeof obj.firstName === 'string') &&
            (obj.lastName === null || typeof obj.lastName === 'string') &&
            isRoundup(obj.roundup) &&
            Array.isArray(obj.transactions) &&
            obj.transactions.every((item: any) => item instanceof firestore.DocumentReference) &&
            typeof obj.uid === 'string' &&
            obj.userCreated instanceof firestore.Timestamp);
  } catch (_) {
    return false;
  }
}

function isRoundup(obj: any): obj is Roundup {
  try {
    return (isRoundupConfig(obj.config) &&
            typeof obj.nextDebit.accAmount === 'number' &&
            (obj.nextDebit.lastChecked === null || obj.nextDebit.lastChecked instanceof firestore.Timestamp) &&
            typeof obj.statistics.total === 'number');
  } catch (_) {
    return false;
  }
}

function isRoundupConfig(obj: any): obj is RoundupConfig {
  try {
    return (!obj.isEnabled ||
            (obj.isEnabled &&
              typeof obj.debitAccountId === 'string' &&
              typeof obj.debitAt === 'number' &&
              typeof obj.roundTo === 'number' &&
              typeof obj.watchedAccountId === 'string'));
  } catch (_) {
    return false;
  }
}

export function isBasiqConfig(obj: any) {
  try {
    return (obj.configStatus === "NOT_CONFIGURED" ||
            (obj.configStatus === "BASIQ_USER_CREATED" &&
              typeof obj.uid === 'string' &&
              typeof obj.clientToken.access_token === 'string' &&
              typeof obj.clientToken.expires_at === 'number') ||
            (obj.configStatus === "COMPLETE" &&
              Array.isArray(obj.availableAccounts) &&
              obj.availableAccounts.every(isBasiqAccount) &&
              Array.isArray(obj.connectionIds) &&
              obj.connectionIds.every((id: any) => typeof id === 'string') &&
              typeof obj.uid === 'string' &&
              typeof obj.clientToken.access_token === 'string' &&
              typeof obj.clientToken.expires_at === 'number'))
  } catch (_) {
    return false;
  }
}

export function isBasiqAccount(obj: any) {
  try {
    return (typeof obj.accountNumber === 'string' &&
    typeof obj.id === 'string' &&
    typeof obj.institution === 'string' &&
            typeof obj.name === 'string')
  } catch (_) {
    return false;
  }
}