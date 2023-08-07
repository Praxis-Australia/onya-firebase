import { DocumentReference } from 'firebase-admin/firestore';
import type { BasiqData, BasiqTransaction } from './Basiq';

// Note: leaving out statistics field because it creates
// Two sources of truth (first is sum of all the transaction docs
// and second is the actual field)
// Will re-add if this is too much of a performance issue
export interface User {
  basiq: BasiqData,
  charitySelection: Map<string, number>,
  firstName: string | null,
  lastName: string | null,
  donationMethods: {
    roundup: RoundupConfig
    nextDebit: {
      accruedAmount: number,
      donationSources: DonationSources[],
    }
  },
  uid: string,
  userCreated: Date,
  email: string | null
}

export interface DonationSources {
  basiqTransaction: DocumentReference<BasiqTransaction>,
  method: 'roundup',
  amount: number,
  charitySelection: User['charitySelection']
}

// Need to remove debitAccountId and debitAt to somewhere else
// If this is not roundup specific
export type RoundupConfig =
  | RoundupConfigDisabled
  | RoundupConfigEnabled

export interface RoundupConfigDisabled {
  debitAccountId?: string | null,
  debitAt?: number | null,
  isEnabled: false,
  roundTo?: number | null,
  watchedAccountId?: string | null
}

export interface RoundupConfigEnabled {
  isEnabled: true,
  debitAccountId: string,
  debitAt: number,
  roundTo: number,
  watchedAccountId: string
}