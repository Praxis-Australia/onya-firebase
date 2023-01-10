

export interface BasiqToken {
  access_token: string;
  expires_at: number;
}

export interface BasiqAccount {
  accountNumber: string,
  id: string,
  institution: string,
  name: string
}