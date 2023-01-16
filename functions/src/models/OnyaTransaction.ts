import { DocumentReference } from "firebase-admin/firestore"
import { BasiqTransaction } from "./Basiq"
import { User } from "./User"

export interface OnyaTransaction {
  basiqJobId: string,
  created: Date,
  updated: Date,
  status: 'success' | 'in-progress' | 'pending' | 'failed',
  payer: {
    userId: string,
    basiqUserId: string,
    basiqAccountId?: string
    bankBranchCode?: string,
    bankAccountNumber?: string,
  },
  description: string,
  amount: number,
  charitySelection: User['charitySelection'],
  donationSources: {
    basiqTransaction: DocumentReference<BasiqTransaction>,
    method: 'roundup',
    amount: number
  }[]
}