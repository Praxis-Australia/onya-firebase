import { DocumentReference } from "firebase-admin/firestore";
import { createPayrequest } from "../api/basiq";
import { BasiqDataComplete, BasiqTransaction } from "../models/Basiq";
import { User } from "../models/User";
import { onyaTransactionCollectionRef, onyaTransactionConverter, userCollectionRef } from "../utils/firestore";
import { roundupBy } from "../utils/roundup";


// Should really turn User into a class rather than just an interface
// So I can have access to DocRef and whatnot
export const processRoundupTransactions = async (user: User, basiqTransactions: Array<[BasiqTransaction, DocumentReference<BasiqTransaction>]>) => {
  const roundup = user.donationMethods.roundup;
  
  if (!roundup.isEnabled) return;

  const basiqData = user.basiq as BasiqDataComplete;

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
      method: 'roundup'
    })

    if (user.donationMethods.nextDebit.accruedAmount > roundup.debitAt) {
      // Process the debit and create OnyaTransaction doc
      await createOnyaTransaction(user.uid, basiqData.uid, user.donationMethods.nextDebit, user.charitySelection);

      // Then reset the accured amount
      user.donationMethods.nextDebit = {
        accruedAmount: 0,
        donationSources: []
      };
    }
  }

// merge: true doesn't work because of how converter is implemented
// So we don't use converter here
  await userCollectionRef
    .doc(user.uid)
    .update({
      'donationMethods.nextDebit': user.donationMethods.nextDebit
    })
}

const createOnyaTransaction = async (uid: string, basiqUid: string, nextDebit: User['donationMethods']['nextDebit'], charitySelection: User['charitySelection']) => {
  const onyaTransactionDocRef = onyaTransactionCollectionRef
    .withConverter(onyaTransactionConverter)
    .doc();

  const payrequest = await createPayrequest(onyaTransactionDocRef.id, basiqUid, nextDebit.accruedAmount);

  onyaTransactionDocRef.set({
    basiqJobId: payrequest.id,
    created: payrequest.created,
    updated: payrequest.updated,
    status: payrequest.status,
    payer: {
      userId: uid,
      basiqUserId: payrequest.payer.payerUserId,
      ...payrequest.payer.payerAccountId ? { basiqAccountId: payrequest.payer.payerAccountId } : {},
      ...payrequest.payer.payerBankBranchCode ? { bankBranchCode: payrequest.payer.payerBankBranchCode } : {},
      ...payrequest.payer.payerAccountNumber ? { bankAccountNumber: payrequest.payer.payerAccountNumber } : {},
    },
    description: payrequest.description,
    amount: Math.round(payrequest.amount * 100),
    charitySelection: charitySelection,
    donationSources: nextDebit.donationSources
  })

  // This was supposed to add reference to transaction but this can also just
  // be done through querying, so I'll just leave it out for now
  // nextDebit.donationSources.forEach(donationSource => {
  //   const transactionDocRef = donationSource.basiqTransaction;
  //   transactionDocRef
  //     .withConverter(basiqTransactionConverter)
  //     .set({

  //     }, { merge: true })
  // })
}