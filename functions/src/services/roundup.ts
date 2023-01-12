
// Non-ordered components of what we need to do
// * Store basiq transactions (subset) in firestore or at least
// * Store the last fetched transaction and its date
// * Write a fetch transactions function which can filter right down to second
// * When refreshing roundup amount, check
//   * Transactions of monitored account from last transaction checked to now
// * After fetching this transaction, add to accrued amount
// * And optionally store the transactions in firestore

// Everytime we roundup, check whether we need to debit the user
// If we do, then debit the user and set amount -= debitedAmount

// Debitting process:
// * Create a payrequest through Basiq
// * Store the transaction data in firestore including
//   * Basic info like amount, charity allocation, etc.
//   * Job ID in Basiq API
//   * Status
// * For all transactions that were debited for in this, make that reference
// * Run a CRON job to keep checking Job Id
//   * When it updates, update firestore with new status


// Optionally:
// Also update a 'finalised' status when we actually donate the money away
// To allow for refunds until they do
// Maybe this field can be internal

// export const refreshRoundupAmount = (uid: string) => {
//   const 
// }

// Firestore data structure:
// - BasiqTransaction: Subcollection of user
// - OnyaTransaction: Collection with references

// Basic principal for everything: Just store the transactions in Firestore when available
// While you do that, update user details as necessary
//   * Should each transaction include how it got processed in roundup/other donation?
//    * YES: less queries (potentially), more intuitive
//    * NO: l
//      * ALTERNATIVE: Have one pending payrequest for all items until last debit
//         * INCLUDE reference from payrequest to Transaction object (usually will be queried in that direction)

// Query cases:
// * See which BasiqTransactions contributed to past/pending payment
//   * get payment => get references => fetch references
// * See pending payment => Alter how will contribute to payment
//   * 


// type PayRequest = {
//   status,
//   balance,
//   transactions[]: {
//     id/reference,
//     amount,
//     method (e.g. roundup)
//     amountContributed,
//     actually A LOT more fields to be able to render decently on web (date, institution, )
        // So maybe store JUST AS REFERENCE
//   }
// }


// Refresh flow (background version, might need faster implementation for on-demand refresh):
// Each time a user's connection is refreshed and fetch all transactions since, we do the following:
//   pendingPayRequestDocCache;
//   for (transaction in AllTransactions):
//      add transactions as new doc under users.transactions collection
//      for each donation method:
//        if transaction should fit any donation methods:
//          add reference to transaction doc in pendingPRDocCache
//          add contribution details to NOT SURE (pendingPRDocCache doc or transaction doc)
//          update amount in payrequest doc
//          if payrequest hits limit for debit, then:
//            update payrequest doc with cache
//            create new pending payrequest
//   after all transactions have been processed:
//      update payrequest doc with cache
//      create new pending payrequest

// Examine a donation method:*