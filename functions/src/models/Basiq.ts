import { Enrich, Transaction } from "../api/basiq/types";

export type BasiqData = 
  | BasiqDataNotConfigured
  | BasiqDataUserCreated
  | BasiqDataComplete;

export interface BasiqDataNotConfigured {
  configStatus: "NOT_CONFIGURED"
}

export interface BasiqDataUserCreated {
  configStatus: "BASIQ_USER_CREATED",
  uid: string,
  clientToken: BasiqToken
}

export interface BasiqDataComplete {
  configStatus: "COMPLETE",
  availableAccounts: Array<BasiqAccount>,
  uid: string,
  clientToken: BasiqToken
}

export interface BasiqToken {
  access_token: string;
  expires_at: number;
}

export interface BasiqAccount {
  accountNumber: string,
  id: string,
  institution: string,
  name: string,
  lastUpdated: Date
}

export interface BasiqTransaction {
  id: string,
  accountId: string,
  amount: number,
  class: Transaction['class'],
  connection: string,
  description: string,
  direction: Transaction['direction'],
  institutionId: string,
  postDate: Date | null,
  status: Transaction['status'],
  transactionDate: Date | null,
  enrich: {
    location: Enrich['location'],
    merchant: Enrich['merchant']
  }
}