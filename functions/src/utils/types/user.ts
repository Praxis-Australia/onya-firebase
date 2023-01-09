import { DocumentReference } from 'firebase-admin/firestore'
import { BasiqConfig } from './Basiq'

export interface User {
  basiq: BasiqConfig,
  charitySelection: Map<string, number>,
  firstName: string | null,
  lastName: string | null,
  roundup: Roundup,
  transactions: Array<DocumentReference>,
  uid: string,
  userCreated: Date
}

export interface Roundup {
  config: RoundupConfig,
  nextDebit: {
    accAmount: number,
    lastChecked: Date | null,
  }
  statistics: {
    total: number,
  }
}

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