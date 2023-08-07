import { CollectionReference, DocumentReference } from "firebase-admin/firestore";
import { BasiqTransaction } from "../models/Basiq";
import { User } from "../models/User";
import { roundupBy } from "../utils/roundup";
import { OnyaTransaction } from "../models/OnyaTransaction";
import { Payrequest } from "../api/basiq/types";


// Should really turn User into a class rather than just an interface
// So I can have access to DocRef and whatnot
export const processRoundupTransactions = (
  createPayrequest: (requestId: string, payerUserId: string, amount: number) => Promise<Payrequest>,
  onyaTransactionCollection: CollectionReference<OnyaTransaction>,
  userDocRef: DocumentReference<User>,
) => async (
  user: User, 
  basiqTransactions: Array<[BasiqTransaction, DocumentReference<BasiqTransaction>]>,
) => {
  const roundup = user.donationMethods.roundup;
  
  if (!roundup.isEnabled) return;

  let filteredTransactions = basiqTransactions.filter(value => {
    const transactionData = value[0];
    return transactionData.accountId === roundup.watchedAccountId &&
           transactionData.class === 'payment' &&
           transactionData.direction === 'debit';
  })

  // Converting to for-loop to reduce weirdness with async forEach
  for (const value of filteredTransactions) {
    const transactionData = value[0];
    const transactionDocRef = value[1];
    const roundupAmount = roundupBy(-1 * transactionData.amount, roundup.roundTo);

    user.donationMethods.nextDebit.accruedAmount += roundupAmount;
    user.donationMethods.nextDebit.donationSources.push({
      basiqTransaction: transactionDocRef,
      amount: roundupAmount,
      method: 'roundup',
      charitySelection: user.charitySelection
    })

    if (user.donationMethods.nextDebit.accruedAmount > roundup.debitAt) {
      // Process the debit and create OnyaTransaction doc
      await createOnyaTransaction(
        onyaTransactionCollection,
        createPayrequest,
        user
        );

      // Then reset the accured amount
      user.donationMethods.nextDebit = {
        accruedAmount: 0,
        donationSources: []
      };
    }
  }

  await userDocRef.set(user);
}

const createOnyaTransaction = async (
  onyaTransactionCollection: CollectionReference<OnyaTransaction>,
  createPayrequest: (requestId: string, payerUserId: string, amount: number) => Promise<Payrequest>,
  user: User
) => {
  if (user.basiq.configStatus === 'NOT_CONFIGURED') throw new Error('Basiq not configured');

  const onyaTransactionDocRef = onyaTransactionCollection.doc();

  const payrequest = await createPayrequest(
    onyaTransactionDocRef.id, 
    user.basiq.uid, 
    user.donationMethods.nextDebit.accruedAmount
  );

  onyaTransactionDocRef.set({
    basiqJobId: payrequest.id,
    created: payrequest.created,
    updated: payrequest.updated,
    status: payrequest.status,
    payer: {
      userId: user.uid,
      basiqUserId: payrequest.payer.payerUserId,
      ...payrequest.payer.payerAccountId ? { basiqAccountId: payrequest.payer.payerAccountId } : {},
      ...payrequest.payer.payerBankBranchCode ? { bankBranchCode: payrequest.payer.payerBankBranchCode } : {},
      ...payrequest.payer.payerAccountNumber ? { bankAccountNumber: payrequest.payer.payerAccountNumber } : {},
    },
    description: payrequest.description,
    amount: Math.round(payrequest.amount * 100),
    donationSources: user.donationMethods.nextDebit.donationSources
  });
}