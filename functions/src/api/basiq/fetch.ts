import fetch, { Response } from 'node-fetch'
import { 
  ErrorBody, 
  ErrorInstance, 
  ErrorInstance400,
  ErrorInstance403,
  ErrorInstance404,
  ErrorInstance500,
  Transaction,
  User,
  Account,
  ErrorInstance401
} from "./schema"


// Wrapper for working with fetch requests to Basiq API,
// i.e. what @api/basiq was supposed to do if it works.
// On top of normal fetch, it simplifies the following:
// 1. Wraps HTTP error responses in custom APIError class
// 2. Provides type signatures to function input and output
// 3. Allow some parameters to be passed in as objects (e.g. Date)

// Unless the fetch request itself fails, all functions either
// return a valid response or throw an API Error

// Formats Date object into YYYY-MM-DD for Basiq API
const dateFormat = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

// Defines a custom APIError class for handling error responses
export class APIError<T extends ErrorInstance> extends Error {
  status: number;
  data: T;

  constructor(res: Response, data: T) {
    super();
    this.status = res.status;
    this.name = `Error response returned by Basiq API with ${res.status}`;
    this.data = data;
  }
}

// API endpoints
export interface PostAuthTokenResponse {
  access_token: string,
  expires_in: number,
  token_type: string
}

export const postAuthToken = async (apiKey: string, basiqUid?: string): Promise<PostAuthTokenResponse> => {
  const url = 'https://au-api.basiq.io/token';

  const encodedParams = new URLSearchParams();
  if (basiqUid) {
    encodedParams.set('scope', 'CLIENT_ACCESS');
    encodedParams.set('userId', basiqUid)
  } else {
    encodedParams.set('scope', 'SERVER_ACCESS')
  }

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'basiq-version': '3.0',
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${apiKey}`
    },
    body: encodedParams
  };

  const res: Response = await fetch(url, options);

  if (res.ok) return res.json() as Promise<PostAuthTokenResponse>;
  
  throw await getAPIError(res);
}

export const createUser = async (accessToken: string, mobile: string, email?: string, firstName?: string, lastName?: string): Promise<User> => {
  const url = 'https://au-api.basiq.io/users';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      mobile,
      ...email ? {email} : {},
      ...firstName ? {firstName} : {},
      ...lastName ? {lastName} : {}
    })
  };

  const res = await fetch(url, options);

  if (res.ok) return res.json() as Promise<User>;

  throw await getAPIError(res);
}

export const getUser = async (accessToken: string, userId: string): Promise<User> => {
  const url = `https://au-api.basiq.io/users/${userId}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json', 
      authorization: `Bearer ${accessToken}`
    }
  };

  const res = await fetch(url, options);

  if (res.ok) return res.json() as Promise<User>;

  throw await getAPIError(res);
}

export interface GetAccountsResponse {
  type: 'list',
  data: Array<Account>
}

export const listAccounts = async (accessToken: string, userId: string): Promise<GetAccountsResponse> => {
  const url = `https://au-api.basiq.io/users/${userId}/accounts`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json', 
      authorization: `Bearer ${accessToken}`
    }
  };

  const res = await fetch(url, options);

  if (res.ok) return res.json() as Promise<GetAccountsResponse>;

  throw await getAPIError(res);
}


interface ListTransactionsResponse {
  type: 'list',
  count: number,
  size: number,
  data: Array<Transaction>,
  links: { self: string, next?: string }
}

interface ListTransactionsFilter {
  'account.id'?: string,
  'transaction.status'?: Transaction["status"],
  'transaction.postDate'?: 
    { from: Date, to?: Date } |
    { from?: Date, to: Date },
  'transaction.direction'?: Transaction["direction"],
  'transaction.class'?: Transaction["class"]
  'institution.id'?: string,
}

export const listTransactions = async (accessToken: string, userId: string, limit?: number, filter?: ListTransactionsFilter): Promise<ListTransactionsResponse> => {
  const url = `https://au-api.basiq.io/users/${userId}/transactions`;
  const encodedQueryParams = new URLSearchParams();

  if (typeof limit !== 'undefined') encodedQueryParams.set('limit', limit.toString());
  if (typeof filter !== 'undefined') {
    let filterParamValue: string = Object.keys(filter).reduce((acc: string, key: string, index: number) => {
      const value = filter[key as keyof ListTransactionsFilter]!;

      // Add comma at start if it's not the first key

      // For all cases where not transaction.postDate, filter for equality
      if (typeof value === 'string') return `${acc}${acc ? ',' : ''}${key}.eq('${value}')`;

      // In the else case, the key is 'transaction.postDate'
      if (value.from) {
        acc += `${acc}${acc ? ',' : ''}${key}.gteq('${dateFormat.format(value.from)}')`
      }
      if (value.to) {
        acc += `${acc}${acc ? ',' : ''}${key}.lteq('${dateFormat.format(value.to)}')`
      }
      return acc
    },'');

    if (filterParamValue) encodedQueryParams.set('filter', filterParamValue)
  }

  const options = {
    method: 'GET', 
    headers: { 
      accept: 'application/json',
      authorization: `Bearer ${accessToken}`
    }
  };

  const res = await fetch(url + '?' + encodedQueryParams, options);

  if (res.ok) return res.json() as Promise<ListTransactionsResponse>;
  
  throw await getAPIError(res);
}

export const listTransactionsNext = async (accessToken: string, nextUrl: string): Promise<ListTransactionsResponse> => {
  const options = {
    method: 'GET', 
    headers: { 
      accept: 'application/json',
      authorization: `Bearer ${accessToken}`
    }
  };

  const res = await fetch(nextUrl, options);

  if (res.ok) return res.json() as Promise<ListTransactionsResponse>;
  
  throw await getAPIError(res);
}

const getAPIError = async <T extends ErrorInstance>(res: Response): Promise<APIError<T>> => {
  const errorBody = await res.json() as ErrorBody<T>;
  const data = errorBody.data[0];

  switch (res.status) {
    case 400:
      throw new APIError(res, data as ErrorInstance400)
    case 401:
      throw new APIError(res, data as ErrorInstance401)
    case 403:
      throw new APIError(res, data as ErrorInstance403)
    case 404:
      throw new APIError(res, data as ErrorInstance404)
    case 500:
      throw new APIError(res, data as ErrorInstance500)
    default:
      throw new APIError(res, data);
  }
}
