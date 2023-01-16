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
  ErrorInstance401,
  AuthToken,
  Payrequest
} from "../types"
import { parseAccount, parseAuthToken, parsePayrequest, parseTransaction, parseUser } from "./schema";


// Wrapper for working with fetch requests to Basiq API,
// i.e. what @api/basiq was supposed to do if it works.
// On top of normal fetch, it simplifies the following:
// 1. Wraps HTTP error responses in custom APIError class
// 2. Provides type signatures to function input and output
// 3. Allow input to be provided as JS objects (e.g. Date)
// 4. Transform output primitives into JS objects (e.g. Date)

// Unless the fetch request itself fails, all functions either
// return a valid response or throw an API Error

// Defines a custom APIError class for handling error responses
export class APIError<T extends ErrorInstance> extends Error {
  status: number;
  data: T;

  constructor(res: Response, body: ErrorBody<T>) {
    super();
    this.status = res.status;
    this.name = `Error response returned by Basiq API with ${res.status}`;
    this.data = body.data[0];
  }
}

// Formats Date object into YYYY-MM-DD for Basiq API
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

// Endpoints

export const postAuthToken = async (apiKey: string, basiqUid?: string): Promise<AuthToken> => {
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

  const res = await fetch(url, options);

  if (res.ok) return parseAuthToken(await res.json());
  
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

  if (res.ok) return parseUser(await res.json());

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

  if (res.ok) return parseUser(await res.json());

  throw await getAPIError(res);
}

export const listAccounts = async (accessToken: string, userId: string): Promise<{type: 'list', data: Account[]}> => {
  const url = `https://au-api.basiq.io/users/${userId}/accounts`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json', 
      authorization: `Bearer ${accessToken}`
    }
  };

  const res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    return {
      type: 'list', 
      data: data.data.map(parseAccount)
    }
  };

  throw await getAPIError(res);
}

interface ListTransactionsResponse {
  type: 'list',
  count: number,
  size: number,
  data: Transaction[],
  links: { self: string, next?: string }
}

export interface ListTransactionsFilter {
  'account.id'?: string,
  'transaction.status'?: Transaction["status"],
  'transaction.postDate'?: 
    { from: Date, to?: Date } |
    { from?: Date, to: Date },
  'transaction.direction'?: Transaction["direction"],
  'transaction.class'?: Transaction["class"]
  'institution.id'?: string,
}

// Quirks about the endpoint:
// - Can't filter to exact time/date, just to date
export const listTransactions = async (accessToken: string, userId: string, limit?: number, filter?: ListTransactionsFilter): Promise<ListTransactionsResponse> => {
  const url = `https://au-api.basiq.io/users/${userId}/transactions`;
  const encodedQueryParams = new URLSearchParams();

  if (typeof limit !== 'undefined') encodedQueryParams.set('limit', limit.toString());
  if (typeof filter !== 'undefined') {
    let filterParamValue: string = Object.keys(filter).reduce((acc: string, key: string) => {
      const value = filter[key as keyof ListTransactionsFilter]!;

      // Add comma at start if it's not the first key

      // For all cases where not transaction.postDate, filter for equality
      if (typeof value === 'string') return acc + `${acc ? ',' : ''}${key}.eq('${value}')`;

      // In the else case, the key is 'transaction.postDate'
      if (value.from) {
        acc += `${acc ? ',' : ''}${key}.gteq('${formatDate(value.from)}')`
      }
      if (value.to) {
        acc += `${acc ? ',' : ''}${key}.lteq('${formatDate(value.to)}')`
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

  if (res.ok) {
    const data = await res.json();
    return {
      ...data,
      data: data.data.map(parseTransaction)
    }
  };
  
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

  if (res.ok) {
    const data = await res.json();
    return {
      ...data,
      data: data.data.map(parseTransaction)
    }
  };
  
  throw await getAPIError(res);
}

interface SubmitPayRequestResponse {
  jobs: [ { 
    type: 'job',
    id: string,
    requestId: string,
    links: { self: string }
  } ]
}

export const submitPayRequest = async (accessToken: string, requestId: string, payerUserId: string, description: string, amount: number, collectFundsToFloat?: boolean, checkAccountBalance?: boolean): Promise<SubmitPayRequestResponse> => {
  // Basiq API has a weird bug where it only accepts amount as number, not string
  // But it doesn't accept rounded up numbers (e.g. 12 instead of 12.00)
  // Because JSON.stringify doesn't encode in this way, we implement custom solution
  const body = `{
    "payrequests": [
      {
        "payer": {
              "payerUserId": "${payerUserId}"
        },
        "collectFundsToFloat": ${collectFundsToFloat ?? null},
        "checkAccountBalance": ${checkAccountBalance ?? null},
        "requestId": "${requestId}",
        "description": "${description}",
        "amount": ${amount.toFixed(2)}
      }
    ]
  }`
  
  // JSON.stringify({ payrequests: [ {
  //   requestId,
  //   payer: { payerUserId },
  //   description,
  //   amount: amount.toFixed(2),
  //   ...collectFundsToFloat ? { collectFundsToFloat } : {},
  //   ...checkAccountBalance ? { checkAccountBalance } : {}
  // } ] })

  const url = 'https://au-api.basiq.io/payments/payrequests';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`
    },
    body: body
  };
  
  const res = await fetch(url, options);

  if (res.ok) return await res.json();

  throw await getAPIError(res);
}

export const getPayrequest = async (accessToken: string, payrequestId: string): Promise<Payrequest> => {
  const url = `https://au-api.basiq.io/payments/payrequests/${payrequestId}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${accessToken}`
    }
  };

  const res = await fetch(url, options);

  if (res.ok) return parsePayrequest(await res.json());

  throw await getAPIError(res);
}

const getAPIError = async (res: Response): Promise<APIError<ErrorInstance>> => {
  const errorBody = await res.json();

  switch (res.status) {
    case 400:
      throw new APIError<ErrorInstance400>(res, errorBody)
    case 401:
      throw new APIError<ErrorInstance401>(res, errorBody)
    case 403:
      throw new APIError<ErrorInstance403>(res, errorBody)
    case 404:
      throw new APIError<ErrorInstance404>(res, errorBody)
    case 500:
      throw new APIError<ErrorInstance500>(res, errorBody)
    default:
      throw new APIError(res, errorBody);
  }
}