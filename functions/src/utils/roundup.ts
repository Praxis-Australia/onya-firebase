export const roundupBy = (amount: number, roundTo: number, doRoundFull=false): number => {
  if (doRoundFull) {
    return roundTo - (amount % roundTo);
  } else {
    return (roundTo - (amount % roundTo)) % roundTo;
  }
}

// export const getTotalRoundupAmount = (transactionList: BasiqTransaction[], roundupConfig: RoundupConfigEnabled): number => {
//   return transactionList.map(transaction => {

//   })
  
  
//   reduce((total, transaction) => {
//   //   if (transaction.direction === 'credit') return total;
//   //   if (transaction.account != roundupConfig.watchedAccountId) return total;
    
//   //   return total + roundupBy(transaction.amount, roundupConfig.roundTo);
//   // }, 0)
// }
