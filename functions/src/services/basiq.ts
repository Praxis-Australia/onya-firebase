import { HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import Basiq from '../api/basiq';
import type { BasiqData, BasiqDataComplete, BasiqDataUserCreated, BasiqTransaction } from '../models/Basiq';
import { CollectionReference, DocumentReference } from 'firebase-admin/firestore';
import { User } from '../models/User';
import { Transaction as BasiqApiTransaction } from '../api/basiq/types';

export const initBasiqUser = async (
  basiq: Basiq,
  userDocument: DocumentReference<User>,
  mobile: string,
  email: string,
  firstName?: string,
  lastName?: string,
  allowOverwrite = false
): Promise<void> => {
  const userSnapshot = await userDocument.get()
    .catch(err => {
      logger.error(`Error fetching user from Firestore`, err);
      throw new HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (!userSnapshot.exists) {
    throw new HttpsError('not-found', 'User document does not exist in Firestore');
  }

  const user = userSnapshot.data()!;

  if (!allowOverwrite && user.basiq.configStatus !== 'NOT_CONFIGURED') {
    throw new HttpsError('already-exists', 'A Basiq user has already been created for this user');
  }

  const data = await basiq.createUser(mobile, email, firstName, lastName);

  // Ideally we'd use .update() so we can only update field as needed
  // But because of nodejs-firestore issue #1745, it's not typesafe
  // So as a workaround we use .set() with already fetched data
  const { access_token, expires_at } = await basiq.postClientAuthToken(data.id);

  await userDocument
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
      logger.error(`Error writing user to Firestore`, err);
      throw new HttpsError('internal', 'Error writing user to Firestore', err);
    });
}

export const getBasiqClientToken = async (
  basiq: Basiq,
  userDocument: DocumentReference<User>): Promise<string> => {
  const userSnapshot = await userDocument
    .get()
    .catch(err => {
      logger.error(`Error fetching user from Firestore`, err);
      throw new HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (!userSnapshot.exists) {
    throw new HttpsError('not-found', 'User document does not exist in Firestore');
  }

  const user = userSnapshot.data()!;

  if (user.basiq.configStatus === "NOT_CONFIGURED") {
    throw new HttpsError('failed-precondition', 'A Basiq user has not been created for this user');
  }

  const clientToken = user.basiq.clientToken;

  if (clientToken.expires_at - new Date().getTime() > 5 * 60 * 1000) {
    return clientToken.access_token;
  } else {
    user.basiq.clientToken = await basiq.postClientAuthToken(user.basiq.uid);

    await userDocument
      .set(user)
      .catch((err) => {
        logger.error(`Error writing user to Firestore`, err);
        throw new HttpsError('internal', 'Error writing user to Firestore', err);
      });

    return user.basiq.clientToken.access_token;
  }
}

// @arg callbackFn: used on each fetched transaction to update data for roundups, etc.
export const refreshBasiqInfo = async (
  basiq: Basiq,
  userDocument: DocumentReference<User>,
  userBasiqTransactions: CollectionReference<BasiqTransaction>,
  refreshTransactions = true,
  transactionsCallbackFn?: (
    arg0: User,
    arg1: Array<[BasiqTransaction, DocumentReference<BasiqTransaction>]>
  ) => any) => {

  const userSnapshot = await userDocument
    .get()
    .catch(err => {
      logger.error(`Error fetching user from Firestore`, err);
      throw new HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (!userSnapshot.exists) {
    throw new HttpsError('not-found', 'User document does not exist in Firestore');
  }

  const user = userSnapshot.data()!;
  const basiqData = user.basiq;

  if (basiqData.configStatus === "NOT_CONFIGURED") {
    throw new HttpsError('failed-precondition', 'A Basiq user has not been created for this user');
  }

  const availableAccounts = await basiq.listAccounts(basiqData.uid);

  const updatedBasiqData: BasiqData = (availableAccounts.length) ? {
    configStatus: "COMPLETE",
    uid: basiqData.uid,
    availableAccounts,
    clientToken: basiqData.clientToken,
  } as BasiqDataComplete : {
    configStatus: "BASIQ_USER_CREATED",
    uid: basiqData.uid,
    clientToken: basiqData.clientToken
  } as BasiqDataUserCreated;

  user.basiq = updatedBasiqData;
  
  await userDocument
    .set(user)
    .catch((err) => {
      logger.error(`Error writing user to Firestore`, err);
      throw new HttpsError('internal', 'Error writing user to Firestore', err);
    });

  if (!refreshTransactions) return;

  const transactions: BasiqApiTransaction[] = [];

  // Check each account for new transactions and collate their data
  for (const account of availableAccounts) {
    // For now, we only fetch posted transactions because of Basiq's API
    // ambiguity around how pending transactions work
    let accountLastUpdated = account.lastUpdated;

    const query = await basiq.listTransactions(basiqData.uid, undefined, {
      'account.id': account.id,
      'transaction.status': 'posted',
      'transaction.postDate': { from: accountLastUpdated }
    });

    if (query.next) {
      logger.log(`Data not fully fetched. Next: ${query.next.link}`)
    }

    transactions.push(...query.data);
  }

  const basiqTransactions: Array<[BasiqTransaction, DocumentReference<BasiqTransaction>]> = [];

  const basiqTransactionsCollection = userBasiqTransactions;
  // Add each transaction to Firestore
  for (let transaction of transactions) {
    const transactionDocRef = basiqTransactionsCollection.doc(transaction.id);

    if ((await transactionDocRef.get()).exists) continue;

    const basiqTransaction: BasiqTransaction = {
      id: transaction.id,
      accountId: transaction.account, 
      amount: Math.round(transaction.amount * 100),
      class: transaction.class,
      connection: transaction.connection,
      description: transaction.description,
      direction: transaction.direction,
      institutionId: transaction.institution,
      postDate: transaction.postDate,
      status: transaction.status,
      transactionDate: transaction.transactionDate,
      enrich: {
        location: transaction.enrich.location,
        merchant: transaction.enrich.merchant,
      }
    }
    
    await transactionDocRef.set(basiqTransaction)
      .catch((err) => {
        logger.error(`Error writing transaction to Firestore`, err);
        throw new HttpsError('internal', 'Error writing transaction to Firestore', err);
      });

    basiqTransactions.push([basiqTransaction, transactionDocRef]);
  }

  if (transactionsCallbackFn) await transactionsCallbackFn(user, basiqTransactions);
}