import { firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import type { BasiqToken, BasiqTransaction } from '../models/Basiq';
import type { User } from '../models/User';

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
      basiq: {
        ...user.basiq,
        ...(user.basiq.configStatus === 'COMPLETE') ? {
          availableAccounts: user.basiq.availableAccounts.map(account => ({
            ...account,
            lastUpdated: firestore.Timestamp.fromDate(account.lastUpdated)
          }))
        } : {}
      },
      charitySelection: Object.fromEntries(user.charitySelection),
      roundup: {
        ...user.roundup,
        nextDebit: {
          accAmount: user.roundup.nextDebit.accAmount,
          lastChecked: user.roundup.nextDebit.lastChecked && firestore.Timestamp.fromDate(user.roundup.nextDebit.lastChecked)
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
        basiq: {
          ...data.basiq,
          ...(data.basiq.configStatus === 'COMPLETE') ? {
            availableAccounts: data.basiq.availableAccounts.map((account: any) => ({
              ...account,
              lastUpdated: account.lastUpdated.toDate()
            }))
          } : {}
        },
        charitySelection: new Map<string, number>(Object.entries(data.charitySelection)),
        firstName: data.firstName,
        lastName: data.lastName,
        roundup: {
          config: data.roundup.config,
          nextDebit: {
            accAmount: data.roundup.nextDebit.accAmount,
            lastChecked: data.roundup.nextDebit.lastChecked && data.roundup.nextDebit.lastChecked.toDate()
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
    return (matchesBasiqData(obj.basiq) &&
            Object.values(obj.charitySelection).every(value => typeof value === 'number') &&
            (obj.firstName == null || typeof obj.firstName === 'string') &&
            (obj.lastName == null || typeof obj.lastName === 'string') &&
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
            (obj.nextDebit.lastChecked == null || obj.nextDebit.lastChecked instanceof firestore.Timestamp) &&
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

function matchesBasiqDataNotConfigured(obj: any): boolean {
  try {
    return (obj.configStatus === "NOT_CONFIGURED")
  } catch (_) {
    return false;
  }
}

function matchesBasiqDataUserCreated(obj: any): boolean {
  try {
    return (obj.configStatus === "BASIQ_USER_CREATED" &&
            typeof obj.uid === 'string' &&
            typeof obj.clientToken.access_token === 'string' &&
            typeof obj.clientToken.expires_at === 'number') 
  } catch (_) {
    return false;
  }
}

function matchesBasiqDataComplete(obj: any): boolean {
  try {
    return (obj.configStatus === "COMPLETE" &&
            typeof obj.uid === 'string' &&
            typeof obj.clientToken.access_token === 'string' &&
            typeof obj.clientToken.expires_at === 'number' &&
            Array.isArray(obj.availableAccounts) &&
            obj.availableAccounts.every(matchesBasiqAccount))
  } catch (_) {
    return false;
  }
}

function matchesBasiqData(obj: any): boolean {
  try {
    return (matchesBasiqDataNotConfigured(obj) ||
            matchesBasiqDataUserCreated(obj) ||
            matchesBasiqDataComplete(obj))
  } catch (_) {
    return false;
  }
}

function matchesBasiqAccount(obj: any): boolean {
  try {
    return (typeof obj.accountNumber === 'string' &&
            typeof obj.id === 'string' &&
            typeof obj.institution === 'string' &&
            typeof obj.name === 'string' &&
            obj.lastUpdated instanceof firestore.Timestamp)
  } catch (_) {
    return false;
  }
}

export const getBasiqTransactionsCollectionRef = (userRef: firestore.DocumentReference) => {
  if (userRef.parent.id !== 'users') {
    throw new Error("The input is not a reference to a user doc")
  }

  return userRef.collection('basiqTransactions') as firestore.CollectionReference<BasiqTransaction>;
} 

export const basiqTransactionConverter: firestore.FirestoreDataConverter<BasiqTransaction> = {
  toFirestore(basiqTransaction: BasiqTransaction): FirebaseFirestore.DocumentData {
    return {
      ...basiqTransaction,
      postDate: basiqTransaction.postDate && firestore.Timestamp.fromDate(basiqTransaction.postDate),
      transactionDate: basiqTransaction.transactionDate && firestore.Timestamp.fromDate(basiqTransaction.transactionDate)
    };
  },
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): BasiqTransaction {
    const data = snapshot.data();
    if (!matchesBasiqTransaction(data)) {
      throw new https.HttpsError('failed-precondition', 'The document is not a valid BasiqTransaction');
    } else {
      return {
        id: data.id,
        accountId: data.accountId,
        amount: data.amount,
        class: data.class,
        direction: data.direction,
        institutionId: data.institutionId,
        postDate: data.postDate && data.postDate.toDate(),
        status: data.status,
        transactionDate: data.transactionDate && data.transactionDate.todate()
      };
    }
  }
}

function matchesBasiqTransaction(obj: any): boolean {
  const validClassValue: BasiqTransaction['class'][] = [
    'bank-fee',
    'payment',
    'cash-withdrawal',
    'transfer',
    'loan-interest',
    'refund',
    'direct-credit',
    'interest',
    'loan-repayment'
  ]

  try {
    return (typeof obj.id === 'string' &&
            typeof obj.accountId === 'string' &&
            typeof obj.amount === 'number' &&
            typeof obj.class === 'string' &&
            validClassValue.includes(obj.class) &&
            typeof obj.id === 'string' &&
            (obj.id === 'debit' || obj.id === 'credit') &&
            typeof obj.institutionId ==='string' &&
            (obj.postDate == null || obj.postDate instanceof firestore.Timestamp) &&
            typeof obj.status === 'string' &&
            (obj.status === 'pending' || obj.status === 'posted') &&
            (obj.transactionDate == null || obj.transactionDate instanceof firestore.Timestamp))
  } catch (_) {
    return false;
  }
}