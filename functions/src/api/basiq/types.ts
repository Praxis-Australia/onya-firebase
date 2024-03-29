// Following fields left broad because they're unsued
// And because uncertainty over scheme
// Connection.profile

// Quirk about transaction response
// - When transaction is pending, there's no postDate
// - When transaction is posted, there's no transactionDate
// - I'm not sure if the id persists
// - postDate defaults to a rounded-date, not actual time
export interface Transaction {
  type: 'transaction',
  id: string,
  account: string,
  amount: number,
  balance: number | null,
  class: 
    'bank-fee' | 
    'payment' | 
    'cash-withdrawal' | 
    'transfer' | 
    'loan-interest' |
    'refund' |
    'direct-credit' |
    'interest' |
    'loan-repayment',
  connection: string,
  description: string,
  direction: 'debit' | 'credit',
  enrich: Enrich
  institution: string,
  postDate: Date | null,
  status: 'pending' | 'posted',
  transactionDate: Date | null,
  links: {
    account: string,
    institution: string,
    self: string
  }
}

export interface Enrich {
  category: { 
    anzsic?: {
      class?: {
        title?: string,
        code?: string
      },
      division?: {
        titile?: string,
        code?: string,
      },
      group?: {
        titile?: string,
        code?: string,
      },
      subdivision?: {
        titile?: string,
        code?: string,
      }
    } 
  },
  location: {
    country?: string,
    formattedAddress?: string,
    geometry?: { lat?: string, lng?: string },
    postalCode?: string,
    route?: string,
    routeNo?: string,
    state?: string,
    suburb?: string,
  },
  merchant: {
    id: string,
    businessName: string,
    ABN: string,
    logoMaster: string,
    logoThumb: string,
    phoneNumber?: { international?: string, local?: string },
    website: string
  }
}

export interface Account {
  type: 'account',
  id: string,
  accountHolder: string | null,
  accountNo: string,
  availableFunds: number,
  balance: number,
  class: Array<{
    type: 
      'transaction' |
      'savings' |
      'credit-card' |
      'mortgage' |
      'loan' |
      'investment' |
      'term-deposit' |
      'insurance' |
      'foreign' |
      'unknown',
    product: string
  }>,
  connection: string,
  currency: string,
  institution: string,
  lastUpdated: Date,
  name: string,
  status: 'available' | 'unavailable',
  transactionIntervals: Array<{
    from: Date,
    to: Date
  }>,
  links: {
    institution: string,
    transactions: string,
    self: string
  }
}

export interface Connection {
  type: 'connection',
  id: string,
  method: 'web' | 'openbanking',
  accounts: {
    type: 'list',
    data: Array<Account>
  },
  institution: {
    type: 'institution',
    id: string,
    links: { self: string }
  },
  profile: { [key: string]: any},
  status: 'active' | 'pending' | 'invalid',
  links: {
    accounts?: string,
    self: string,
    transactions?: string,
    user: string
  }
}

export interface User {
  type: 'user',
  id: string,
  accounts: {
    type: 'list',
    count: number,
    data: Array<{
      type: 'account',
      id: string,
      links: { self: string }
    }>
  },
  connections: {
    type: 'list',
    count: number,
    data: Array<{
      type: 'connection',
      id: string,
      links: { self: string }
    }>
  },
  email: string,
  mobile: string,
  name: string,
  links: {
    accounts: string,
    connections: string,
    self: string,
    transactions: string
  }
}

export interface Job {
  type: 'job',
  id: string,
  created: Date,
  updated: Date,
  steps: Array<{
    title: string,
    status: 'success' | 'in-progress' | 'pending' | 'failed',
    result: null | {
      type: string
    }
  }>,
  links: {
    self: string,
    source: string
  }
}

export interface PayrequestJob extends Job {
  partnerId: string,
  applicationId: string,
  jobType: 'payrequest'
}

export interface Payrequest {
  type: 'payrequest',
  id: string,
  requestId: string,
  created: Date,
  updated: Date,
  method: string,
  status: 'success' | 'in-progress' | 'pending' | 'failed',
  payer: {
    payerUserId: string,
    payerBankBranchCode?: string,
    payerAccountNumber?: string,
    payerAccountId?: string
  },
  description: string,
  amount: number,
  currency: string,
  links: {
    self: string,
    job: string
  }
}

export interface AuthToken {
  access_token: string,
  expires_in: number,
  token_type: string
}

export interface List<T> {
  count: number,
  data: T[],
  // Potentially make this into a callable in next iteration
  next?: {
    remainingCount: number,
    link: string
  }
}

export interface ErrorBody<T extends ErrorInstance> {
  type: 'list',
  correlationId: string,
  data: Array<T>
}

export interface ErrorInstance {
  type: 'error',
  detail?: string,
  title?: string,
}

export interface ErrorInstance400 extends ErrorInstance {
  code:
    'parameter-not-supplied' |
    'parameter-not-valid' |
    'unsupported-accept' |
    'invalid-content' |
    'institution-not-supported' |
    'invalid-credentials',
  source?: {
    parameter?: string,
    pointer?: string
  }
}

export interface ErrorInstance401 extends ErrorInstance {
  code:
    'unauthorized-access' |
    'invalid-authorization-token'
}

export interface ErrorInstance403 extends ErrorInstance {
  code:
    'forbidden-access' |
    'no-production-access' |
    'access-denied'
  source?: {
    parameter?: string,
    pointer?: string
  }
}

export interface ErrorInstance404 extends ErrorInstance {
  code: 'resource-not-found',
}

export interface ErrorInstance500 extends ErrorInstance {
  code: 'internal-server-error',
}
