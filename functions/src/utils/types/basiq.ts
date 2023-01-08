export interface BasiqToken {
  access_token: string;
  expires_at: number;
}

export function isBasiqToken(obj: any): obj is BasiqToken {
  try {
    return (typeof obj.access_token === 'string' && 
            typeof obj.expires_at === 'number')
  } catch (_) {
    return false;
  }
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
}

export interface BasiqConfigComplete {
  configStatus: "COMPLETE",
  availableAccounts: Array<BasiqAccount>,
  connectionIds: Array<string>,
  uid: string
}

export function isBasiqConfig(obj: any) {
  try {
    return (obj.configStatus === "NOT_CONFIGURED" ||
            (obj.configStatus === "BASIQ_USER_CREATED" &&
              typeof obj.uid === 'string') ||
            (obj.configStatus === "COMPLETE" &&
              Array.isArray(obj.availableAccounts) &&
              obj.availableAccounts.every(isBasiqAccount) &&
              Array.isArray(obj.connectionIds) &&
              obj.connectionIds.every((id: any) => typeof id === 'string') &&
              typeof obj.uid === 'string'))
  } catch (_) {
    return false;
  }
}

export interface BasiqAccount {
  accountNumber: string,
  id: string,
  institution: string,
  name: string
}

export function isBasiqAccount(obj: any) {
  try {
    return (typeof obj.accountNumber === 'string' &&
    typeof obj.id === 'string' &&
    typeof obj.institution === 'string' &&
            typeof obj.name === 'string')
  } catch (_) {
    return false;
  }
}