// Interfaces for raw res.json() from endpoints
import * as outputSchema from "../types"

interface RawTransaction {
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
};

interface RawAccount {
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

interface RawConnection {
  type: 'connection',
  id: string,
  method: 'web' | 'openbanking',
  accounts: {
    type: 'list',
    data: Array<RawAccount>
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

interface RawUser {
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
};

interface RawJob {
  type: 'job',
  id: string,
  created: string,
  updated: string,
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

interface RawPayrequestJob extends RawJob {
  partnerId: string,
  applicationId: string,
  jobType: 'payrequest'
}

interface RawPayrequest {
  type: 'payrequest',
  id: string,
  requestId: string,
  created: string,
  updated: string,
  method: string,
  status: 'success' | 'in-progress' | 'pending',
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

interface RawAuthToken {
  access_token: string,
  expires_in: number,
  token_type: string
}

// Gets date in YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS format
const parseDate = (date: string): Date => {
  if (Number.isNaN(Date.parse(date))) {
    throw TypeError("Input string is not a valid date format")
  } else {
    return new Date(date)
  }
}

const parseNum = (num: string): number => {
  if (Number.isNaN(Number.parseFloat(num))) {
    throw TypeError("Input string is not a valid number")
  } else {
    return Number.parseFloat(num);
  }
}

export const parseTransaction = (data: RawTransaction): outputSchema.Transaction => ({
  ...data,
  amount: parseNum(data.amount),
  balance: parseNum(data.balance),
  postDate: data.postDate ? parseDate(data.postDate) : null,
  transactionDate: data.transactionDate ? parseDate(data.transactionDate) : null
})

export const parseAccount = (data: RawAccount): outputSchema.Account => ({
  ...data,
  availableFunds: parseNum(data.availableFunds),
  balance: parseNum(data.balance),
  lastUpdated: parseDate(data.lastUpdated),
  transactionIntervals: data.transactionIntervals.map(({ from, to }) => ({
    from: parseDate(from),
    to: parseDate(to)
  }))
})

export const parseConnection = (data: RawConnection): outputSchema.Connection => ({
  ...data,
  accounts: {
    ...data.accounts,
    data: data.accounts.data.map(parseAccount)
  }
})

export const parseUser = (data: RawUser): outputSchema.User => ({
  ...data
})

export const parseJob = (data: RawJob): outputSchema.Job => ({
  ...data,
  created: parseDate(data.created),
  updated: parseDate(data.updated),
})

export const parsePayrequestJob = (data: RawPayrequestJob): outputSchema.PayrequestJob => ({
  ...data,
  ...parseJob(data)
})


export const parsePayrequest = (data: RawPayrequest): outputSchema.Payrequest => ({
  ...data,
  created: parseDate(data.created),
  updated: parseDate(data.updated),
})


export const parseAuthToken = (data: RawAuthToken): outputSchema.AuthToken => ({
  ...data
})