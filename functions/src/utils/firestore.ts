import { 
  getFirestore,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  CollectionReference,
  Timestamp
} from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import type { BasiqToken, BasiqTransaction } from '../models/Basiq';
import { OnyaTransaction } from '../models/OnyaTransaction';
import type { User } from '../models/User';

const db = getFirestore();

export const basiqTokenDocRef = db.collection('env').doc('basiqToken') as DocumentReference<BasiqToken>;

export const basiqTokenConverter: FirestoreDataConverter<BasiqToken> = {
  toFirestore(basiqToken: BasiqToken): FirebaseFirestore.DocumentData {
    return basiqToken;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): BasiqToken {
    const data = snapshot.data();
    if (!matchesBasiqToken(data)) {
      throw new HttpsError('failed-precondition', 'The document is not a valid BasiqToken');
    } else {
      return {
        access_token: data.access_token,
        expires_at: data.expires_at
      };
    }
  }
}

export const userCollectionRef = db.collection('users');

export const userDocConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return { 
      ...user,
      basiq: {
        ...user.basiq,
        ...(user.basiq.configStatus === 'COMPLETE') ? {
          availableAccounts: user.basiq.availableAccounts.map(account => ({
            ...account,
            lastUpdated: Timestamp.fromDate(account.lastUpdated)
          }))
        } : {}
      },
      charitySelection: Object.fromEntries(user.charitySelection),
      donationMethods: {
        roundup: user.donationMethods.roundup,
        nextDebit: user.donationMethods.nextDebit
      },
      userCreated: Timestamp.fromDate(user.userCreated)
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {  
    const data = snapshot.data();
    if (!matchesUser(data)) {
      throw new HttpsError('failed-precondition', 'The document is not a valid User');
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
        donationMethods: {
          roundup: data.donationMethods.roundup,
          nextDebit: data.donationMethods.nextDebit
        },
        uid: data.uid,
        userCreated: data.userCreated.toDate(),
        email: data.email
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
            matchesCharitySelection(obj.charitySelection) &&
            (obj.firstName == null || typeof obj.firstName === 'string') &&
            (obj.lastName == null || typeof obj.lastName === 'string') &&
            matchesNextDebit(obj.donationMethods.nextDebit) &&
            matchesRoundupConfig(obj.donationMethods.roundup) &&
            typeof obj.uid === 'string' &&
            obj.userCreated instanceof Timestamp &&
            (obj.email == null || typeof obj.email === 'string'));
  } catch (_) {
    return false;
  }
}

function matchesNextDebit(obj: any): boolean {
  try {
    return (typeof obj.accruedAmount === 'number' &&
            Array.isArray(obj.donationSources) &&
            obj.donationSources.every(matchesDonationSource));
  } catch (_) {
    return false;
  }
}

function matchesCharitySelection(obj: any): boolean {
  try {
    return Object.values(obj).every(value => typeof value === 'number') &&
           Object.keys(obj).every(key => typeof key === 'string');
  } catch (_) {
    return false;
  }
}

function matchesDonationSource(obj: any): boolean {
  try {
    const validDonationMethods = ['roundup']
    return (validDonationMethods.includes(obj.method) &&
            typeof obj.amount === 'number' &&
            obj.basiqTransaction instanceof DocumentReference &&
            obj.basiqTransaction.parent.id === 'basiqTransactions' &&
            matchesCharitySelection(obj.charitySelection))
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
            obj.lastUpdated instanceof Timestamp)
  } catch (_) {
    return false;
  }
}

export const getBasiqTransactionsCollectionRef = (userRef: DocumentReference) => {
  if (userRef.parent.id !== 'users') {
    throw new Error("The input is not a reference to a user doc")
  }

  return userRef.collection('basiqTransactions') as CollectionReference<BasiqTransaction>;
} 

export const basiqTransactionConverter: FirestoreDataConverter<BasiqTransaction> = {
  toFirestore(basiqTransaction: BasiqTransaction): FirebaseFirestore.DocumentData {
    return {
      ...basiqTransaction,
      postDate: basiqTransaction.postDate && Timestamp.fromDate(basiqTransaction.postDate),
      transactionDate: basiqTransaction.transactionDate && Timestamp.fromDate(basiqTransaction.transactionDate)
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): BasiqTransaction {
    const data = snapshot.data();
    if (!matchesBasiqTransaction(data)) {
      throw new HttpsError('failed-precondition', 'The document is not a valid BasiqTransaction');
    } else {
      return {
        id: data.id,
        accountId: data.accountId,
        amount: data.amount,
        class: data.class,
        connection: data.connection,
        description: data.description,
        direction: data.direction,
        institutionId: data.institutionId,
        postDate: data.postDate && data.postDate.toDate(),
        status: data.status,
        transactionDate: data.transactionDate && data.transactionDate.todate(),
        enrich: data.enrich
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
            (obj.postDate == null || obj.postDate instanceof Timestamp) &&
            typeof obj.status === 'string' &&
            (obj.status === 'pending' || obj.status === 'posted') &&
            (obj.transactionDate == null || obj.transactionDate instanceof Timestamp))
  } catch (_) {
    return false;
  }
}

export const onyaTransactionCollectionRef = db.collection('onyaTransactions') as CollectionReference<OnyaTransaction>;

export const onyaTransactionConverter: FirestoreDataConverter<OnyaTransaction> = {
  toFirestore(onyaTransaction: OnyaTransaction): FirebaseFirestore.DocumentData {
    return {
      ...onyaTransaction,
      created: Timestamp.fromDate(onyaTransaction.created),
      updated: Timestamp.fromDate(onyaTransaction.updated)
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): OnyaTransaction {
    const data = snapshot.data();
    if (!matchesOnyaTransaction(data)) {
      throw new HttpsError('failed-precondition', 'The document is not a valid BasiqTransaction');
    } else {
      return {
        basiqJobId: data.basiqJobId,
        created: data.created.toDate(),
        updated: data.updated.toDate(),
        status: data.status,
        payer: data.payer,
        description: data.description,
        amount: data.amount,
        donationSources: data.donationSources,
      };
    }
  }
}

function matchesOnyaTransaction(obj: any): boolean {
  const validStatus: OnyaTransaction['status'][] = ['success', 'in-progress', 'pending', 'failed'];

  try {
    return (typeof obj.basiqJobId === 'string' &&
            obj.created instanceof Timestamp &&
            obj.updated instanceof Timestamp &&
            validStatus.includes(obj.status) &&
            typeof obj.payer.userId === 'string' &&
            typeof obj.payer.basiqUserId === 'string' &&
            (obj.payer.basiqAccountId == null || typeof obj.payer.basiqAccountId === 'string') &&
            (obj.payer.bankBranchCode == null || typeof obj.payer.bankBranchCode === 'string') &&
            (obj.payer.bankAccountNumber == null || typeof obj.payer.bankAccountNumber === 'string') &&
            typeof obj.description === 'string' &&
            typeof obj.amount === 'number' &&
            Array.isArray(obj.donationSources) &&
            obj.donationSources.every(matchesDonationSource))
  } catch (_) {
    return false;
  }
}

