import { https } from 'firebase-functions';
import type { BasiqAccount } from '../../models/Basiq';
import { getBasiqToken } from './auth';
import * as basiqFetch from './fetch';
import { List, Payrequest, Transaction, User } from './types';

// This layer is just a nice wrapper for all the functions in ./fetch
// We DON'T fuck with firestore and stuff here, that should be done in /services.

// Things that this layer does:
// 1. Allow some parameters to be passed in as objects (e.g. Date)
// 2. Transform output primitives into JS objects (e.g. Date)
// 3. Remove need to provide redundant params (e.g. access token)
// 4. Structure output to be more usable in services
// 5. Automatically fetches next objects

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

export const listAccounts = async (basiqUid: string): Promise<Array<BasiqAccount>> => {
  const res = await basiqFetch.listAccounts(await getBasiqToken(), basiqUid);
  const accounts = res.data;
  
  return accounts.map(account => ({
    id: account.id,
    name: account.name,
    institution: account.institution,
    accountNumber: account.accountNo,
    lastUpdated: account.lastUpdated
  }));
}

export const listTransactions = async (userId: string, limit?: number, filter?: basiqFetch.ListTransactionsFilter, maxNextDepth=5): Promise<List<Transaction>> => {
  const accessToken = await getBasiqToken();

  const initRes = await basiqFetch.listTransactions(accessToken, userId, limit, filter);
  const size = initRes.size;
  let count = initRes.count;
  let nextLink = initRes.links.next;
  let transactions: Array<Transaction> = initRes.data;

  for (let i = 0; i < maxNextDepth; i++) {
    if (!nextLink) break;

    const nextRes = await basiqFetch.listTransactionsNext(accessToken, nextLink);
    count += nextRes.count;
    transactions.push(...nextRes.data);
    nextLink = nextRes.links.next;
  }

  return {
    count,
    data: transactions,
    ...(nextLink) ? { 'next': {
      remainingCount: size - count,
      link: nextLink
    }} : {}
  };
}

export const createUser = async (mobile: string, email?: string, firstName?: string, lastName?: string): Promise<User> => {
  const res = await basiqFetch.createUser(await getBasiqToken(), mobile, email, firstName, lastName);

  return res;
}

export const createPayrequest = async (requestId: string, payerUserId: string, amount: number): Promise<Payrequest> => {
  const res = await basiqFetch.submitPayRequest(await getBasiqToken(), requestId, payerUserId, `OnyaTransaction: ${requestId}`, amount, true, true);
  
  const payrequest = await basiqFetch.getPayrequest(await getBasiqToken(), res.jobs[0].id);
  
  return payrequest;
}