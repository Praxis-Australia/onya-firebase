import { https } from 'firebase-functions';
import type { BasiqAccount } from '../../models/Basiq';
import { getBasiqToken } from './auth';
import * as basiqFetch from './fetch';
import { User } from './schema';

export const postClientAuthToken = async (basiqUid: string) => {
  if (!process.env.BASIQ_API_KEY) {
    throw new https.HttpsError('not-found', 'Basiq API key not set in env');
  }
  
  const { access_token, expires_in } = await basiqFetch.postAuthToken(process.env.BASIQ_API_KEY, basiqUid);
  const expires_at  = new Date().getTime() + expires_in * 1000;

  return {
    access_token,
    expires_at
  }
}

export const listConnectionIds = async (basiqUid: string): Promise<Array<string>> => {
  const res = await basiqFetch.getUser(await getBasiqToken(), basiqUid);
  const connections = res.connections.data;
  
  return connections.map(connection => connection.id);
}

export const listAccountsIdName = async (basiqUid: string): Promise<Array<BasiqAccount>> => {
  const res = await basiqFetch.listAccounts(await getBasiqToken(), basiqUid);
  const accounts = res.data;
  
  return accounts.map(account => ({
    id: account.id,
    name: account.name,
    institution: account.institution,
    accountNumber: account.accountNo,
  } as BasiqAccount));;
}

export const createUser = async (mobile: string, email?: string, firstName?: string, lastName?: string): Promise<User> => {
  const res = await basiqFetch.createUser(await getBasiqToken(), mobile, email, firstName, lastName);

  return res;
}