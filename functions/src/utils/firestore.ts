import { firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import { BasiqConfig, BasiqToken } from './types/Basiq';
import { User } from './types/User';

export const basiqTokenDocRef = firestore().collection('env').doc('basiqToken') as firestore.DocumentReference<BasiqToken>;

export const basiqTokenConverter: firestore.FirestoreDataConverter<BasiqToken> = {
  toFirestore(basiqToken: BasiqToken): FirebaseFirestore.DocumentData {
    return basiqToken;
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): BasiqToken {
    const data = snapshot.data();
    if (!matchesBasiqToken(data)) {
      throw new https.HttpsError('failed-precondition', 'The document is not a valid BasiqToken');
    } else {
      return {
        access_token: data.access_token,
        expires_at: data.expires_at
      };
    }
  }
}

export const userCollectionRef = firestore().collection('users') as firestore.CollectionReference<User>;

export const userDocConverter: firestore.FirestoreDataConverter<User> = {
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return { 
      ...user,
      charitySelection: Object.fromEntries(user.charitySelection),
      roundup: {
        ...user.roundup,
        nextDebit: {
          accAmount: user.roundup.nextDebit.accAmount,
          lastChecked: (user.roundup.nextDebit.lastChecked) ? firestore.Timestamp.fromDate(user.roundup.nextDebit.lastChecked) : null
        }
      },
      userCreated: firestore.Timestamp.fromDate(user.userCreated)
    };
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): User {  
    const data = snapshot.data();
    if (!matchesUser(data)) {
      throw new https.HttpsError('failed-precondition', 'The document is not a valid User');
    } else {
      return {
        basiq: data.basiq as BasiqConfig,
        charitySelection: new Map<string, number>(Object.entries(data.charitySelection)),
        firstName: data.firstName,
        lastName: data.lastName,
        roundup: {
          config: data.roundup.config,
          nextDebit: {
            accAmount: data.roundup.nextDebit.accAmount,
            lastChecked: (data.roundup.nextDebit.lastChecked) ? data.roundup.nextDebit.lastChecked.toDate() : null
          },
          statistics: {
            total: data.roundup.statistics.total
          }
        },
        transactions: data.transactions,
        uid: data.uid,
        userCreated: data.userCreated.toDate()
      };
    }
  }
}

// # Checks to validate that the Firebase docs can be typed
export function matchesBasiqToken(obj: any): boolean {
  try {
    return (typeof obj.access_token === 'string' && 
            typeof obj.expires_at === 'number')
  } catch (_) {
    return false;
  }
}

function matchesUser(obj: any): boolean {
  try {
    return (matchesBasiqConfig(obj.basiq) &&
            Object.values(obj.charitySelection).every(value => typeof value === 'number') &&
            (obj.firstName === null || typeof obj.firstName === 'string') &&
            (obj.lastName === null || typeof obj.lastName === 'string') &&
            matchesRoundup(obj.roundup) &&
            Array.isArray(obj.transactions) &&
            obj.transactions.every((item: any) => item instanceof firestore.DocumentReference) &&
            typeof obj.uid === 'string' &&
            obj.userCreated instanceof firestore.Timestamp);
  } catch (_) {
    return false;
  }
}

function matchesRoundup(obj: any): boolean {
  try {
    return (matchesRoundupConfig(obj.config) &&
            typeof obj.nextDebit.accAmount === 'number' &&
            (obj.nextDebit.lastChecked === null || obj.nextDebit.lastChecked instanceof firestore.Timestamp) &&
            typeof obj.statistics.total === 'number');
  } catch (_) {
    return false;
  }
}

function matchesRoundupConfigEnabled(obj: any): boolean {
  try {
    return (obj.isEnabled &&
            typeof obj.debitAccountId === 'string' &&
            typeof obj.debitAt === 'number' &&
            typeof obj.roundTo === 'number' &&
            typeof obj.watchedAccountId === 'string')
  } catch (_) {
    return false;
  }
}

function matchesRoundupConfig(obj: any): boolean {
  try {
    return (!obj.isEnabled ||
            matchesRoundupConfigEnabled(obj));
  } catch (_) {
    return false;
  }
}

function matchesBasiqConfigNotConfigured(obj: any): boolean {
  try {
    return (obj.configStatus === "NOT_CONFIGURED")
  } catch (_) {
    return false;
  }
}

function matchesBasiqConfigUserCreated(obj: any): boolean {
  try {
    return (obj.configStatus === "BASIQ_USER_CREATED" &&
            typeof obj.uid === 'string' &&
            typeof obj.clientToken.access_token === 'string' &&
            typeof obj.clientToken.expires_at === 'number') 
  } catch (_) {
    return false;
  }
}

function matchesBasiqConfigComplete(obj: any): boolean {
  try {
    return (obj.configStatus === "COMPLETE" &&
            Array.isArray(obj.availableAccounts) &&
            obj.availableAccounts.every(matchesBasiqAccount) &&
            Array.isArray(obj.connectionIds) &&
            obj.connectionIds.every((id: any) => typeof id === 'string') &&
            typeof obj.uid === 'string' &&
            typeof obj.clientToken.access_token === 'string' &&
            typeof obj.clientToken.expires_at === 'number')
  } catch (_) {
    return false;
  }
}

function matchesBasiqConfig(obj: any): boolean {
  try {
    return (matchesBasiqConfigNotConfigured(obj) ||
            matchesBasiqConfigUserCreated(obj) ||
            matchesBasiqConfigComplete(obj))
  } catch (_) {
    return false;
  }
}

function matchesBasiqAccount(obj: any): boolean {
  try {
    return (typeof obj.accountNumber === 'string' &&
            typeof obj.id === 'string' &&
            typeof obj.institution === 'string' &&
            typeof obj.name === 'string')
  } catch (_) {
    return false;
  }
}