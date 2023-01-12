import { Transaction } from "../api/basiq/schema";
import { RoundupConfigEnabled } from "../models/User";

export const roundupBy = (amount: number, roundTo: number): number => {
  return roundTo - (amount % roundTo);
}

export const getTotalRoundupAmount = (transactionList: Transaction[], roundupConfig: RoundupConfigEnabled): number => {
  return transactionList.reduce((total, transaction) => {
    if (transaction.direction === 'credit') return total;
    if (transaction.account != roundupConfig.watchedAccountId) return total;
    
    return total + roundupBy(Number.parseFloat(transaction.amount), roundupConfig.roundTo);
  }, 0)
}
