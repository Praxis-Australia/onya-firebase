import { HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import type { BasiqData, BasiqTransaction } from '../models/Basiq';
import { 
  basiqTransactionConverter, 
  getBasiqTransactionsCollectionRef, 
  userCollectionRef, 
  userDocConverter 
} from "../utils/firestore";
import { 
  createUser as createBasiqUser,  
  listAccounts, 
  listTransactions,
  postClientAuthToken
} from '../api/basiq';
import { DocumentReference } from 'firebase-admin/firestore';
import { User } from '../models/User';

export const initBasiqUser = async (uid: string, mobile: string, firstName?: string, lastName?: string, email?: string, allowOverwrite=false): Promise<void> => {
  const userSnapshot = await userCollectionRef.doc(uid).get()
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

  const data = await createBasiqUser(mobile, email, firstName, lastName);
  
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
      logger.error(`Error writing user to Firestore`, err);
      throw new HttpsError('internal', 'Error writing user to Firestore', err);
    });
}

export const getBasiqClientToken = async (uid: string): Promise<string> => {
  const userRef = userCollectionRef.doc(uid);
  const userSnapshot = await userRef
    .withConverter(userDocConverter)
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
      .catch((err) => {
        logger.error(`Error writing user to Firestore`, err);
        throw new HttpsError('internal', 'Error writing user to Firestore', err);
      });

    return access_token;
  }
}


// @arg callbackFn: used on each fetched transaction to update data for roundups, etc.
export const refreshBasiqInfo = async (uid: string, refreshTransactions=true, transactionsCallbackFn?: (arg0: User, arg1: Array<[BasiqTransaction, DocumentReference<BasiqTransaction>]>) => any): Promise<void> => {
  const userRef = userCollectionRef.doc(uid);
  const userSnapshot = await userRef
    .withConverter(userDocConverter)
    .get()
    .catch(err => {
      logger.error(`Error fetching user from Firestore`, err);
      throw new HttpsError('unavailable', 'Network error connecting with Firestore', err);
    });

  if (!userSnapshot.exists) {
    throw new HttpsError('not-found', 'User document does not exist in Firestore');
  }

  const user = userSnapshot.data()!;
  const basiq = user.basiq;

  if (basiq.configStatus === "NOT_CONFIGURED") {
    throw new HttpsError('failed-precondition', 'A Basiq user has not been created for this user');
  }

  const availableAccounts = await listAccounts(basiq.uid);

  const updatedBasiqData: BasiqData = (availableAccounts.length) ? {
    configStatus: "COMPLETE",
    uid: basiq.uid,
    availableAccounts,
    clientToken: basiq.clientToken,
  } : {
    configStatus: "BASIQ_USER_CREATED",
    uid: basiq.uid,
    clientToken: basiq.clientToken
  }

  const updatedUser = {
    ...user,
    basiq: updatedBasiqData
  }

  await userCollectionRef.doc(uid)
    .withConverter(userDocConverter)
    .set(updatedUser)
    .catch((err) => {
      logger.error(`Error writing user to Firestore`, err);
      throw new HttpsError('internal', 'Error writing user to Firestore', err);
    });
  
  if (!refreshTransactions) return;

  availableAccounts.forEach(async account => {
    // For now, we only fetch posted transactions because of Basiq's API
    // ambiguity around how pending transactions work
    let fetchFrom = account.lastUpdated;
    if (basiq.configStatus === 'COMPLETE') {
      const previousMatchingAccount = basiq.availableAccounts.find(item => item.id === account.id);
      if (previousMatchingAccount) {
        fetchFrom = previousMatchingAccount.lastUpdated;
      }
    }

    const query = await listTransactions(basiq.uid, undefined, { 
      'account.id': account.id,
      'transaction.status': 'posted',
      'transaction.postDate': { from: fetchFrom }
    });
    
    if (query.next) {
      logger.log(`Data not fully fetched. Next: ${query.next.link}`)
    }
    const transactions = query.data;

    // We are doing this in a for-loop and push rather than Array.prototype methods
    // Because it's wonky with async methods and for performance
    const basiqTransactions: Array<[BasiqTransaction, DocumentReference<BasiqTransaction>]> = [];

    for (const transaction of transactions) {
      const transactionRef = getBasiqTransactionsCollectionRef(userRef)
        .withConverter(basiqTransactionConverter)
        .doc(transaction.id)

      if ((await transactionRef.get()).exists) continue;

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

      basiqTransactions.push([basiqTransaction, transactionRef]);
    }

    basiqTransactions.forEach(async transaction => {
      await transaction[1]
        .set(transaction[0])
        .catch((err) => {
          logger.error(`Error writing transaction to Firestore`, err);
          throw new HttpsError('internal', 'Error writing transaction to Firestore', err);
        })
    })

    if (transactionsCallbackFn) await transactionsCallbackFn(updatedUser, basiqTransactions);
  })
}