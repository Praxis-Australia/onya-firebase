import { DocumentReference } from 'firebase-admin/firestore';
import type { BasiqAccount, BasiqAuthToken } from '../../models/Basiq';
import { getBasiqAuthToken } from './auth';
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

class Basiq {
  apiKey: string;
  authTokenDoc: DocumentReference<BasiqAuthToken>;
  authToken: BasiqAuthToken | null;

  constructor(apiKey: string, authTokenDoc: DocumentReference<BasiqAuthToken>) {
    this.apiKey = apiKey;
    this.authTokenDoc = authTokenDoc;
    this.authToken = null;
  }

  getAccessToken = async () => {
    const isAuthTokenValid =
      (this.authToken !== null)
      && (this.authToken.expires_at - new Date().getTime() > 5 * 60 * 1000);

    if (isAuthTokenValid) {
      return this.authToken!.access_token;
    } else {
      this.authToken = await getBasiqAuthToken(this.apiKey, this.authTokenDoc);
      return this.authToken.access_token;
    }
  }

  postClientAuthToken = async (basiqUid: string) => {
    const { access_token, expires_in } = await basiqFetch.postAuthToken(this.apiKey, basiqUid);
    const expires_at = new Date().getTime() + expires_in * 1000;

    return {
      access_token,
      expires_at
    }
  }

  listConnectionIds = async (basiqUid: string): Promise<Array<string>> => {
    const res = await basiqFetch.getUser(await this.getAccessToken(), basiqUid);
    const connections = res.connections.data;

    return connections.map(connection => connection.id);
  }

  listAccounts = async (basiqUid: string): Promise<Array<BasiqAccount>> => {
    const res = await basiqFetch.listAccounts(await this.getAccessToken(), basiqUid);
    const accounts = res.data;

    return accounts.map(account => ({
      id: account.id,
      name: account.name,
      institution: account.institution,
      accountNumber: account.accountNo,
      lastUpdated: account.lastUpdated
    }));
  }

  listTransactions = async (userId: string, limit?: number, filter?: basiqFetch.ListTransactionsFilter, maxNextDepth = 5): Promise<List<Transaction>> => {
    const accessToken = await this.getAccessToken();

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
      ...(nextLink) ? {
        'next': {
          remainingCount: size - count,
          link: nextLink
        }
      } : {}
    };
  }

  createUser = async (mobile: string, email?: string, firstName?: string, lastName?: string): Promise<User> => {
    const res = await basiqFetch.createUser(await this.getAccessToken(), mobile, email, firstName, lastName);

    return res;
  }

  createPayrequest = async (requestId: string, payerUserId: string, amount: number): Promise<Payrequest> => {
    const res = await basiqFetch.submitPayRequest(await this.getAccessToken(), requestId, payerUserId, `Onya Direct Debit`, amount / 100, true, true);

    // Wait one second to give Basiq time to process the request
    await new Promise(resolve => setTimeout(resolve, 1000));

    const payrequest = await basiqFetch.getPayrequest(await this.getAccessToken(), res.jobs[0].id);

    return payrequest;
  }
}

export default Basiq;