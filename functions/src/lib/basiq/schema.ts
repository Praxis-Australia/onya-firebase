// Following fields left broad because they're unsued
// And because uncertainty over scheme
// Transaction.enrich
// Connection.profile

export interface Transaction {
  type: 'transaction',
  id: string,
  account: string,
  amount: string,
  balance: string,
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
  direction: 'debit' | 'credit',
  enrich?: { [key: string]: any}
  institution: string,
  postDate: string,
  status: 'pending' | 'posted',
  transactionDate: string,
  links: {
    account: string,
    institution: string,
    self: string
  }
}

export interface Account {
  type: 'account',
  id: string,
  accountHolder: string | null,
  accountNo: string,
  availableFunds: string,
  balance: string,
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
  lastUpdated: string,
  name: string,
  status: 'available' | 'unavailable',
  transactionIntervals: Array<{
    from: string,
    to: string
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
    data: {
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
