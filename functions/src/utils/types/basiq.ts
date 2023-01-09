export interface BasiqToken {
  access_token: string;
  expires_at: number;
}

export type BasiqConfig = 
  | BasiqConfigNotConfigured
  | BasiqConfigUserCreated
  | BasiqConfigComplete;

export interface BasiqConfigNotConfigured {
  configStatus: "NOT_CONFIGURED"
}

export interface BasiqConfigUserCreated {
  configStatus: "BASIQ_USER_CREATED",
  uid: string,
  clientToken: {
    access_token: string,
    expires_at: number 
  }
}

export interface BasiqConfigComplete {
  configStatus: "COMPLETE",
  availableAccounts: Array<BasiqAccount>,
  connectionIds: Array<string>,
  uid: string,
  clientToken: {
    access_token: string,
    expires_at: number 
  }
}

export interface BasiqAccount {
  accountNumber: string,
  id: string,
  institution: string,
  name: string
}