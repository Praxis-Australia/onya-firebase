import { DocumentReference, Timestamp } from 'firebase-admin/firestore'
import { BasiqConfig, isBasiqConfig, } from './basiq'

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

export function isUser(obj: any): obj is User {
  try {
    return (isBasiqConfig(obj.basiq) &&
            obj.charitySelection instanceof Map<string, number> &&
            (obj.firstName === null || typeof obj.firstName === 'string') &&
            (obj.lastName === null || typeof obj.lastName === 'string') &&
            isRoundup(obj.roundup) &&
            Array.isArray(obj.transactions) &&
            obj.transactions.every((item: any) => item instanceof DocumentReference) &&
            typeof obj.uid === 'string' &&
            obj.userCreated instanceof Date);
  } catch (_) {
    return false;
  }
}

interface Roundup {
  config: RoundupConfig,
  nextDebit: {
    accAcmount: number,
    lastChecked: Timestamp | null,
  }
  statistics: {
    total: number,
  }
}

function isRoundup(obj: any): obj is Roundup {
  try {
    return (isRoundupConfig(obj.config) &&
            typeof obj.nextDebit.accAcmount === 'number' &&
            (obj.nextDebit.lastChecked === null || obj.nextDebit.lastChecked instanceof Timestamp) &&
            typeof obj.statistics.total === 'number');
  } catch (_) {
    return false;
  }
}

export type RoundupConfig =
  | RoundupConfigDisabled
  | RoundupConfigEnabled

export interface RoundupConfigDisabled {
  isEnabled: false,
  debitAccountId?: string | null,
  debitAt?: number | null,
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

export function isRoundupConfig(obj: any): obj is RoundupConfig {
  try {
    return (!obj.isEnabled ||
            (obj.isEnabled &&
              typeof obj.debitAccountId === 'string' &&
              typeof obj.debitAt === 'number' &&
              typeof obj.roundTo === 'number' &&
              typeof obj.watchedAccountId === 'string'));
  } catch (_) {
    return false;
  }
}