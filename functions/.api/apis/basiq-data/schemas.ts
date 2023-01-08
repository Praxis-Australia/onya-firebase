const DeleteConnection = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user.',
          },
          connectionId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the connection.',
          },
        },
        required: ['userId', 'connectionId'],
      },
    ],
  },
  response: {
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
              },
              code: {
                type: 'object',
                description: 'Application-specific error code, expressed as a string value.',
                examples: ['service-unavailable'],
                additionalProperties: true,
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Service Unavailable. Try again later.'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetAccount = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'User identifier',
          },
          accountId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Account identifier',
          },
        },
        required: ['userId', 'accountId'],
      },
    ],
  },
  response: {
    '200': {
      title: 'AccountResponseResource',
      required: [
        'id',
        'accountHolder',
        'accountNo',
        'availableFunds',
        'balance',
        'class',
        'connection',
        'currency',
        'institution',
        'lastUpdated',
        'links',
        'name',
        'status',
        'transactionIntervals',
        'type',
      ],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "account".', examples: ['account'] },
        id: {
          type: 'string',
          description: 'Uniquely identifies the account.',
          examples: ['s55bf3'],
        },
        accountHolder: {
          type: 'string',
          description:
            'The name of the account holder as returned by the institution. No formatting is applied. Returns a string or null when not available.',
          examples: ['GAVIN BELSON'],
        },
        accountNo: {
          type: 'string',
          description: 'Full account number.',
          examples: ['600000-157441965'],
        },
        availableFunds: {
          type: 'string',
          description:
            'Funds that are available to an account holder for withdrawal or other use. This may include funds from an overdraft facility or line of credit. As well as funds classified as the available balance, such as from cleared and existing deposits.',
          examples: ['420.28'],
        },
        balance: {
          type: 'string',
          description:
            'Amount of funds in the account right now - excluding any pending transactions. For a credit card this would be zero or the minus amount spent.',
          examples: ['356.50'],
        },
        class: {
          type: 'array',
          description:
            'Describes the class(type) of accounts.\ntransaction, savings, credit-card, mortgage, loan, investment, term-deposit, insurance, foreign, unknown.',
          items: {
            required: ['type', 'product'],
            type: 'object',
            properties: {
              type: { type: 'string', description: 'Account type', examples: ['savings'] },
              product: { type: 'string', description: 'Product name.', examples: ['saver'] },
            },
          },
        },
        connection: {
          type: 'string',
          description: 'The id of the connection resource that was used to retrieve the account.',
          examples: ['8fce3b'],
        },
        currency: {
          type: 'string',
          description: 'The currency the funds are stored in, using ISO 4217 standard.',
          examples: ['AUD'],
        },
        institution: {
          type: 'string',
          description: 'The id of the institution resource the account originated from.',
          examples: ['AU00000'],
        },
        lastUpdated: {
          type: 'string',
          description: 'Timestamp of last update, UTC, RFC 3339 format e.g. "2017-09-28T13:39:33Z"',
          examples: ['2019-09-28T13:39:33Z'],
        },
        name: {
          type: 'string',
          description: 'Account name as defined by institution or user.',
          examples: ['Master Savings'],
        },
        status: {
          type: 'string',
          description: 'Account status\n\n`available` `unavailable`',
          enum: ['available', 'unavailable'],
          examples: ['available'],
        },
        transactionIntervals: {
          type: 'array',
          description:
            'An array of date intervals indicating the coverage of the transaction data relating to the account.\nWill return a single element for accounts sourced from a single bank connection.\nWill return multiple elements in cases where there have been multiple PDF/CSV uploads for an account.',
          items: {
            required: ['from', 'to'],
            type: 'object',
            properties: {
              from: {
                type: 'string',
                description: 'Date of first transaction on this account',
                examples: ['2018-07-01'],
              },
              to: {
                type: 'string',
                description: 'Date of last transaction on this account',
                examples: ['2018-12-30'],
              },
            },
          },
        },
        links: {
          required: ['connection', 'institution', 'self', 'transactions'],
          type: 'object',
          properties: {
            institution: {
              type: 'string',
              description: 'institution link to the institution associated with this account',
              examples: ['https://au-api.basiq.io/institutions/AU00000'],
            },
            transactions: {
              type: 'string',
              description: 'transactions link to the transactions associated with this account',
              examples: [
                "https://au-api.basiq.io/users/ea3a81/transactions?filter=account.id.eq('s55bf3')",
              ],
            },
            self: {
              type: 'string',
              description: 'self link to the requested account',
              examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
            },
          },
        },
      },
      description: 'Container object with account details',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetAccounts = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'User identifier',
          },
        },
        required: ['userId'],
      },
    ],
  },
  response: {
    '200': {
      required: ['data', 'links', 'type'],
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Type of the response, always "list".',
          examples: ['list'],
        },
        data: {
          type: 'array',
          description: 'Container object, containing account details.',
          items: {
            title: 'AccountResponseResource',
            required: [
              'id',
              'accountHolder',
              'accountNo',
              'availableFunds',
              'balance',
              'class',
              'connection',
              'currency',
              'institution',
              'lastUpdated',
              'links',
              'name',
              'status',
              'transactionIntervals',
              'type',
            ],
            type: 'object',
            properties: {
              type: { type: 'string', description: 'Always "account".', examples: ['account'] },
              id: {
                type: 'string',
                description: 'Uniquely identifies the account.',
                examples: ['s55bf3'],
              },
              accountHolder: {
                type: 'string',
                description:
                  'The name of the account holder as returned by the institution. No formatting is applied. Returns a string or null when not available.',
                examples: ['GAVIN BELSON'],
              },
              accountNo: {
                type: 'string',
                description: 'Full account number.',
                examples: ['600000-157441965'],
              },
              availableFunds: {
                type: 'string',
                description:
                  'Funds that are available to an account holder for withdrawal or other use. This may include funds from an overdraft facility or line of credit. As well as funds classified as the available balance, such as from cleared and existing deposits.',
                examples: ['420.28'],
              },
              balance: {
                type: 'string',
                description:
                  'Amount of funds in the account right now - excluding any pending transactions. For a credit card this would be zero or the minus amount spent.',
                examples: ['356.50'],
              },
              class: {
                type: 'array',
                description:
                  'Describes the class(type) of accounts.\ntransaction, savings, credit-card, mortgage, loan, investment, term-deposit, insurance, foreign, unknown.',
                items: {
                  required: ['type', 'product'],
                  type: 'object',
                  properties: {
                    type: { type: 'string', description: 'Account type', examples: ['savings'] },
                    product: { type: 'string', description: 'Product name.', examples: ['saver'] },
                  },
                },
              },
              connection: {
                type: 'string',
                description:
                  'The id of the connection resource that was used to retrieve the account.',
                examples: ['8fce3b'],
              },
              currency: {
                type: 'string',
                description: 'The currency the funds are stored in, using ISO 4217 standard.',
                examples: ['AUD'],
              },
              institution: {
                type: 'string',
                description: 'The id of the institution resource the account originated from.',
                examples: ['AU00000'],
              },
              lastUpdated: {
                type: 'string',
                description:
                  'Timestamp of last update, UTC, RFC 3339 format e.g. "2017-09-28T13:39:33Z"',
                examples: ['2019-09-28T13:39:33Z'],
              },
              name: {
                type: 'string',
                description: 'Account name as defined by institution or user.',
                examples: ['Master Savings'],
              },
              status: {
                type: 'string',
                description: 'Account status\n\n`available` `unavailable`',
                enum: ['available', 'unavailable'],
                examples: ['available'],
              },
              transactionIntervals: {
                type: 'array',
                description:
                  'An array of date intervals indicating the coverage of the transaction data relating to the account.\nWill return a single element for accounts sourced from a single bank connection.\nWill return multiple elements in cases where there have been multiple PDF/CSV uploads for an account.',
                items: {
                  required: ['from', 'to'],
                  type: 'object',
                  properties: {
                    from: {
                      type: 'string',
                      description: 'Date of first transaction on this account',
                      examples: ['2018-07-01'],
                    },
                    to: {
                      type: 'string',
                      description: 'Date of last transaction on this account',
                      examples: ['2018-12-30'],
                    },
                  },
                },
              },
              links: {
                required: ['connection', 'institution', 'self', 'transactions'],
                type: 'object',
                properties: {
                  institution: {
                    type: 'string',
                    description: 'institution link to the institution associated with this account',
                    examples: ['https://au-api.basiq.io/institutions/AU00000'],
                  },
                  transactions: {
                    type: 'string',
                    description:
                      'transactions link to the transactions associated with this account',
                    examples: [
                      "https://au-api.basiq.io/users/ea3a81/transactions?filter=account.id.eq('s55bf3')",
                    ],
                  },
                  self: {
                    type: 'string',
                    description: 'self link to the requested account',
                    examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
                  },
                },
              },
            },
            description: 'Container object with account details',
          },
        },
        links: {
          title: 'ResourceLink',
          required: ['self'],
          type: 'object',
          properties: {
            self: {
              type: 'string',
              description: 'URL of the resource.',
              examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
            },
          },
          description: 'Link object containing a link to the resource, self reference.',
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetConnection = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user.',
          },
          connectionId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the connection.',
          },
        },
        required: ['userId', 'connectionId'],
      },
    ],
  },
  response: {
    '200': {
      title: 'ConnectionGetResponseResource',
      required: ['createdDate', 'method', 'id', 'institution', 'links', 'type'],
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Type, always "connection".',
          examples: ['connection'],
        },
        id: {
          type: 'string',
          description: 'A string that uniquely identifies the user connection.',
          examples: ['61723'],
        },
        method: {
          type: 'string',
          description:
            'A string that uniquely identifies the user connections either it is web or openbanking',
          examples: ['web'],
        },
        createdDate: {
          type: 'string',
          description: 'Created date of the connection, available only for SERVER_SCOPE.',
          examples: ['2019-07-29T07:34:09Z'],
        },
        lastUsed: {
          type: 'string',
          description:
            'UTC Date and Time of when the connection was last used, in RFC 3339 format, available only for SERVER_SCOPE.',
          examples: ['2020-06-22T11:15:09Z'],
        },
        accounts: {
          required: ['data', 'type'],
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Type always "list".', examples: ['list'] },
            data: {
              type: 'array',
              description: 'Accounts details',
              items: {
                required: [
                  'accountNo',
                  'availableFunds',
                  'balance',
                  'class',
                  'currency',
                  'id',
                  'lastUpdated',
                  'links',
                  'name',
                  'status',
                  'type',
                ],
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    description: 'Type always "account".',
                    examples: ['account'],
                  },
                  id: {
                    type: 'string',
                    description: 'Account identification.',
                    examples: ['319ae910'],
                  },
                  name: {
                    type: 'string',
                    description: 'Account name.',
                    examples: ['Business account'],
                  },
                  currency: { type: 'string', description: 'Currency', examples: ['AUD'] },
                  class: {
                    required: ['type', 'product'],
                    type: 'object',
                    properties: {
                      type: { type: 'string', description: 'Account type', examples: ['savings'] },
                      product: {
                        type: 'string',
                        description: 'Product name.',
                        examples: ['saver'],
                      },
                    },
                  },
                  accountNo: {
                    type: 'string',
                    description: 'Account number',
                    examples: ['105148119695'],
                  },
                  availableFunds: {
                    type: 'string',
                    description: 'Account available funds, nullable.',
                    examples: ['200.54'],
                  },
                  balance: {
                    type: 'string',
                    description: 'Account balance, nullable.',
                    examples: ['100.12'],
                  },
                  lastUpdated: {
                    type: 'string',
                    description: 'Account last updated date and time.',
                    examples: ['2017-09-28T11:15:09.756Z'],
                  },
                  status: {
                    type: 'string',
                    description: 'Account status.\n\n`available` `unavailable`',
                    enum: ['available', 'unavailable'],
                    examples: ['available'],
                  },
                  links: {
                    required: ['self', 'transactions'],
                    type: 'object',
                    properties: {
                      transactions: {
                        type: 'string',
                        description:
                          'transactions link to the transactions associated with this account',
                        examples: [
                          "https://au-api.basiq.io/users/ea3a81/transactions?filter=account.id.eq('s55bf3')",
                        ],
                      },
                      self: {
                        type: 'string',
                        description: 'self link to the requested account',
                        examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        institution: {
          title: 'ConnectionInstitution',
          required: ['id', 'links', 'type'],
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Institution id', examples: ['AU00000'] },
            links: {
              title: 'ResourceLink',
              required: ['self'],
              type: 'object',
              properties: {
                self: {
                  type: 'string',
                  description: 'URL of the resource.',
                  examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
                },
              },
              description: 'Link object containing a link to the resource, self reference.',
            },
            type: {
              type: 'string',
              description: 'Always "institution".',
              examples: ['institution'],
            },
          },
          description: 'Institution details.',
        },
        profile: {
          required: [
            'emailAddresses',
            'firstName',
            'fullName',
            'lastName',
            'middleName',
            'phoneNumbers',
            'physicalAddresses',
          ],
          type: 'object',
          properties: {
            emailAddresses: {
              type: 'array',
              description: 'User email address',
              items: { type: 'string' },
              examples: ['gavin@hooli.com'],
            },
            firstName: { type: 'string', description: 'User first name', examples: ['Gavin'] },
            fullName: { type: 'string', description: 'User full name', examples: ['Gavin Belson'] },
            lastName: { type: 'string', description: 'User last name', examples: ['Belson'] },
            middleName: { type: 'string', description: 'User middle name' },
            phoneNumbers: {
              type: 'array',
              description: 'User phone number',
              items: { type: 'string' },
              examples: ['XXXX 888 991'],
            },
            physicalAddresses: {
              type: 'array',
              description: 'Physical user addresses',
              items: {
                title: 'PhysicalAddresses',
                required: [
                  'addressLine1',
                  'addressLine2',
                  'addressLine3',
                  'city',
                  'countryCode',
                  'formattedAddress',
                  'postcode',
                  'state',
                ],
                type: 'object',
                properties: {
                  addressLine1: {
                    type: 'string',
                    description: 'User address.',
                    examples: ['13/91 Fisher Rd'],
                  },
                  addressLine2: { type: 'string', description: 'Always "null"' },
                  addressLine3: { type: 'string', description: 'Always "null"' },
                  city: { type: 'string', description: 'City', examples: ['Sydney'] },
                  country: { type: 'string' },
                  countryCode: { type: 'string', description: 'Country code', examples: ['AU'] },
                  formattedAddress: {
                    type: 'string',
                    description: 'Address formatted.',
                    examples: ['13/91 Fisher Rd, Dee Why NSW 2099, Australia'],
                  },
                  postcode: { type: 'string', description: 'Post code', examples: ['2099'] },
                  state: { type: 'string', description: 'State', examples: ['NSW'] },
                },
                description: 'User physical addresses holding the connection.',
              },
            },
          },
        },
        status: {
          type: 'string',
          description:
            'Indicates the connection status, available only for SERVER_SCOPE.\n\n`active` `pending` `invalid`',
          enum: ['active', 'pending', 'invalid'],
          examples: ['active'],
        },
        links: {
          title: 'GetConnectionLinks',
          required: ['self', 'user'],
          type: 'object',
          properties: {
            accounts: {
              type: 'string',
              description: 'Accounts reference url.',
              examples: [
                "https://au-api.basiq.io/users/cd6fbd92/accounts?filter=institution.id.eq('AU00000')",
              ],
            },
            self: {
              type: 'string',
              description: 'Connection self reference url.',
              examples: [
                'https://au-api.basiq.io/users/cd6fbd92-0b12-43ba-a3c1-286dd5f4f396/connections/29523951',
              ],
            },
            transactions: {
              type: 'string',
              description: 'Transactions reference url.',
              examples: [
                "https://au-api.basiq.io/users/cd6fbd92/transactions?filter=institution.id.eq('AU00000')",
              ],
            },
            user: {
              type: 'string',
              description: 'User reference url.',
              examples: ['https://au-api.basiq.io/users/cd6fbd92'],
            },
          },
          description: 'Object containing links to resources.',
        },
      },
      description: 'Object containing details for connection post.',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`unauthorized-access` `invalid-authorization-token`',
                enum: ['unauthorized-access', 'invalid-authorization-token'],
                examples: ['unauthorized-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['You are not authorized to access this resource'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Unauthorized Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
              },
              code: {
                type: 'object',
                description: 'Application-specific error code, expressed as a string value.',
                examples: ['service-unavailable'],
                additionalProperties: true,
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Service Unavailable. Try again later.'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetConnections = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'User identifier.',
          },
        },
        required: ['userId'],
      },
      {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              "Connections filters, id, status, institution.id. e.g institution.id.eq('AU00000')",
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      title: 'ConnectionsGetResponseResource',
      required: ['type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Type, always "list".', examples: ['list'] },
        data: {
          type: 'array',
          items: {
            required: ['createdDate', 'id', 'method', 'institution', 'links', 'type'],
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type, always "connection".',
                examples: ['connection'],
              },
              id: {
                type: 'string',
                description: 'Connection identification.',
                examples: ['61723'],
              },
              method: {
                type: 'string',
                description: 'method identification.',
                examples: ['openbanking'],
              },
              status: {
                type: 'string',
                description:
                  'Connection status, available only for SERVER_SCOPE.\n\n`active` `pending` `invalid`',
                enum: ['active', 'pending', 'invalid'],
                examples: ['active'],
              },
              createdDate: {
                type: 'string',
                description: 'Created date of the connection, available only for SERVER_SCOPE.',
                examples: ['2019-07-29T07:34:09Z'],
              },
              lastUsed: {
                type: 'string',
                description: 'Connection last used date, available only for SERVER_SCOPE.',
                examples: ['2020-06-22T11:15:09Z'],
              },
              institution: {
                title: 'ConnectionInstitution',
                required: ['id', 'links', 'type'],
                type: 'object',
                properties: {
                  id: { type: 'string', description: 'Institution id', examples: ['AU00000'] },
                  links: {
                    title: 'ResourceLink',
                    required: ['self'],
                    type: 'object',
                    properties: {
                      self: {
                        type: 'string',
                        description: 'URL of the resource.',
                        examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
                      },
                    },
                    description: 'Link object containing a link to the resource, self reference.',
                  },
                  type: {
                    type: 'string',
                    description: 'Always "institution".',
                    examples: ['institution'],
                  },
                },
                description: 'Institution details.',
              },
              links: {
                title: 'GetConnectionsLinks',
                required: ['institution', 'self'],
                type: 'object',
                properties: {
                  accounts: {
                    type: 'string',
                    description: 'Accounts reference url.',
                    examples: [
                      "https://au-api.basiq.io/users/cd6fbd92/accounts?filter=institution.id.eq('AU00000')",
                    ],
                  },
                  institution: {
                    type: 'string',
                    description: 'Institution details.',
                    examples: ['https://au-api.basiq.io/institutions/AU00000'],
                  },
                  self: {
                    type: 'string',
                    description: 'Connection self reference url.',
                    examples: ['https://au-api.basiq.io/users/cd6fbd92/connections/29523951'],
                  },
                  transactions: {
                    type: 'string',
                    description: 'Transactions reference url.',
                    examples: [
                      "https://au-api.basiq.io/users/cd6fbd92/transactions?filter=institution.id.eq('AU00000')",
                    ],
                  },
                },
                description: 'Object containing links to resources.',
              },
            },
          },
        },
        links: {
          title: 'ResourceLink',
          required: ['self'],
          type: 'object',
          properties: {
            self: {
              type: 'string',
              description: 'URL of the resource.',
              examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
            },
          },
          description: 'Link object containing a link to the resource, self reference.',
        },
      },
      description: 'Object containing details for connections.',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
              },
              code: {
                type: 'object',
                description: 'Application-specific error code, expressed as a string value.',
                examples: ['service-unavailable'],
                additionalProperties: true,
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Service Unavailable. Try again later.'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetConnector = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          connectorId: {
            pattern: '^[A-Z]{2}[0-9]{5}$',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Connector ID',
          },
          method: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Connector method',
          },
        },
        required: ['connectorId', 'method'],
      },
    ],
  },
  response: {
    '200': {
      required: [
        'authorization',
        'id',
        'institution',
        'method',
        'scopes',
        'stage',
        'stats',
        'status',
        'type',
      ],
      type: 'object',
      properties: {
        authorization: {
          required: ['type'],
          type: 'object',
          properties: {
            meta: {
              type: 'object',
              properties: {
                forgotten_password_url: {
                  type: 'string',
                  description: 'URL to institution forgotten password page',
                  'x-go-name': 'ForgottenPasswordUrl',
                  examples: ['https://example.com/forgotten-password'],
                },
                login_id_caption: {
                  type: 'string',
                  description: 'Login ID field caption that should be shown on UI',
                  'x-go-name': 'LoginIdCaption',
                  examples: ['User name'],
                },
                password_caption: {
                  type: 'string',
                  description: 'Password field caption that should be shown on UI',
                  'x-go-name': 'PasswordCaption',
                  examples: ['Password'],
                },
                secondary_login_id_caption: {
                  type: 'string',
                  description: 'Secondary loginID caption that should be shown on UI',
                  'x-go-name': 'SecondaryLoginIdCaption',
                  examples: ['Secondary login id'],
                },
                security_code_caption: {
                  type: 'string',
                  description: 'Security code caption that should be shown on UI',
                  'x-go-name': 'SecurityCodeCaption',
                  examples: ['Security code'],
                },
              },
            },
            type: {
              type: 'string',
              description:
                'Authorization type identifier\nuser AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier\n\n`user` `token` `other` `user-mfa` `user-mfa-intermittent`',
              enum: ['user', 'token', 'other', 'user-mfa', 'user-mfa-intermittent'],
              'x-go-enum-desc':
                'user AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier',
              'x-go-name': 'Type',
              examples: ['user'],
            },
          },
        },
        id: {
          maxLength: 7,
          minLength: 7,
          pattern: '^[A-Z]{2}[0-9]{5}$',
          type: 'string',
          description: 'Institution ID',
          examples: ['AU00000'],
        },
        institution: {
          required: ['country', 'logo', 'name', 'shortName', 'tier', 'type'],
          type: 'object',
          properties: {
            country: {
              type: 'string',
              description: 'Institution country name',
              'x-go-name': 'Country',
              examples: ['Australia'],
            },
            logo: {
              required: ['links', 'type'],
              type: 'object',
              properties: {
                colors: {
                  type: 'object',
                  properties: {
                    primary: {
                      type: 'string',
                      description: 'Primary primary institution color',
                      'x-go-name': 'Primary',
                    },
                  },
                  description: 'Colors contains institution colors type',
                },
                links: {
                  required: ['full', 'square'],
                  type: 'object',
                  properties: {
                    full: {
                      type: 'string',
                      description: 'URL to full size logo',
                      'x-go-name': 'Full',
                      examples: ['https://example.com/AU00000-full.svg'],
                    },
                    square: {
                      type: 'string',
                      description: 'Square formatted logo URL',
                      'x-go-name': 'Square',
                      examples: ['https://example.com/AU00000.svg'],
                    },
                  },
                  description: 'LogoResourceLinks contains institution logo resource links',
                },
                type: {
                  type: 'string',
                  description: 'Resource type identifier.\nimage ImageResourceType\n\n`image`',
                  enum: ['image'],
                  'x-go-enum-desc': 'image ImageResourceType',
                  'x-go-name': 'Type',
                  examples: ['image'],
                },
              },
              description: 'InstitutionLogoResource linstitution logo resource type',
            },
            name: {
              type: 'string',
              description: 'Institution name',
              'x-go-name': 'Name',
              examples: ['Hooli Bank'],
            },
            shortName: {
              type: 'string',
              description: 'Institution short name',
              'x-go-name': 'ShortName',
              examples: ['Hooli'],
            },
            tier: {
              type: 'string',
              description:
                'Institution tier identifier\n1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution\n\n`1` `2` `3` `4`',
              enum: ['1', '2', '3', '4'],
              'x-go-enum-desc':
                '1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution',
              'x-go-name': 'Tier',
              examples: ['1'],
            },
            type: {
              type: 'string',
              description:
                'Institution type identifier\nBank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions\n\n`Bank` `Bank (Foreign)` `Test Bank` `Credit Union` `Financial Services` `Superannuation` `Building Society` `Government`',
              enum: [
                'Bank',
                'Bank (Foreign)',
                'Test Bank',
                'Credit Union',
                'Financial Services',
                'Superannuation',
                'Building Society',
                'Government',
              ],
              'x-go-enum-desc':
                'Bank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions',
              'x-go-name': 'Type',
              examples: ['Bank'],
            },
          },
          description: 'ConnectorInstitutionResource connector Institution  resource type',
        },
        links: {
          required: ['self'],
          type: 'object',
          properties: {
            self: { type: 'string', description: 'URL to resource itself', 'x-go-name': 'Self' },
          },
          description: 'ResourceLinks contains resource links',
        },
        method: { type: 'string', description: 'Current Connector method', examples: ['web'] },
        scopes: { type: 'array', description: 'Connector scopes array', items: { type: 'string' } },
        stage: { type: 'string', description: 'Current Connector stage', examples: ['beta'] },
        stats: {
          type: 'object',
          properties: {
            averageDurationMs: {
              type: 'object',
              properties: {
                retrieveAccounts: {
                  type: 'integer',
                  description:
                    'Connector average duration in milliseconds of <b>fetch accounts</b> step for institution',
                  format: 'int64',
                  'x-go-name': 'RetrieveAccounts',
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                retrieveMeta: {
                  type: 'integer',
                  description:
                    'Connector average duration in milliseconds of <b>fetch metadata</b> step for institution',
                  format: 'int64',
                  'x-go-name': 'RetrieveMeta',
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                retrieveTransactions: {
                  type: 'integer',
                  description:
                    'Connector average duration in milliseconds of <b>fetch transactions</b> step for institution',
                  format: 'int64',
                  'x-go-name': 'RetrieveTransactions',
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                total: {
                  type: 'integer',
                  description: 'Total connector average duration in milliseconds',
                  format: 'int64',
                  'x-go-name': 'Total',
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                verifyCredentials: {
                  type: 'integer',
                  description:
                    'Connector average duration in milliseconds of <b>verifiy credentials</b> step for institution',
                  format: 'int64',
                  'x-go-name': 'VerifyCredentials',
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
              },
              description:
                'AverageDurationMs average connector duration in milliseconds per segments.\nWhen durations are not known for institution this field will be `null`.',
              'x-go-name': 'AverageDurationMs',
            },
          },
          description:
            'InstitutionPerformanceStats response type for institution performance stats',
        },
        status: {
          type: 'string',
          description: 'FeatureCondition type that describes an feature status for institution',
        },
        type: {
          type: 'string',
          description:
            'Resource type identifier. It is always "connector" for this model.\nconnector ConnectorEntityType\n\n`connector`',
          enum: ['connector'],
          examples: ['connector'],
        },
      },
      description: 'Connector contains connector data.',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`unauthorized-access` `invalid-authorization-token`',
                enum: ['unauthorized-access', 'invalid-authorization-token'],
                examples: ['unauthorized-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['You are not authorized to access this resource'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Unauthorized Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetConnectors = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            'x-go-name': 'Filter',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              "Filter parameter can be used to filter connector list by connector property. This parameter should contain comma separated list of filter statements.</br>\nFilter statement is composed from entity name (in this case it is always `institution`), property name (e.g. `stage`), filter operator (e.g. `eq`) and quoted string value in parentasis (e.g. `('live')`). </br>\nThe Following list of regular expressions descirbes acceptable filter statements: </br>\n• `(connector).(id).(eq)\\(('[A-Z][A-Z][0-9]{5}')\\)` </br>\n• `(connector).(method).(eq)\\(('web'||'open-banking'|'pdf'|'csv')\\)` </br>\n• `(connector).(status).(eq|ne)\\(('operational'|'degraded-performance'|'partial-outage'|'major-outage'|'under-maintenance'|'under-improvement')\\)` </br>\n• `(connector).(status).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(stage).(eq|ne)\\(('live'|'beta'|'alpha')\\)` </br>\n• `(connector).(stage).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(scopes).(in|eq|ne)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(institution).(country).(eq|ne)\\(('Australia'|'New Zealand')\\)` </br>\n• `(connector).(institution).(country).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(institution).(tier).(eq|ne)\\(('1'|'2'|'3'|'4')\\)` </br>\n• `(connector).(institution).(tier).(in)\\(([\\W\\d]+)\\)` </br>\n• `(connector).(institution).(type).(eq|ne)\\(('Bank'|'Bank \\(Foreign\\)'|'Test Bank'|'Credit Union'|'Financial Services'|'Superannuation')\\)` </br>\n• `(connector).(authorization).(type).(eq|ne)\\(('user'|'user-mfa'|'user-mfa-intermittent'|'other'|'token')\\)` </br>\n• `(connector).(authorization).(type).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(connectorCategory).(eq|ne)\\(('chrome'|'node')\\)` </br>\nMultiple filter definitions should be separated with comma (`,`). </br>\nFor example, this is filter statement will keep only live tier 1 and tier 2 institutions: `filter=connector.stage.eq('live'),connector.institution.tier.in('1','2')` </br>",
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      required: ['data', 'links', 'totalCount', 'type'],
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Data contains list of connectors',
          items: {
            required: [
              'authorization',
              'id',
              'institution',
              'method',
              'scopes',
              'stage',
              'stats',
              'status',
              'type',
            ],
            type: 'object',
            properties: {
              authorization: {
                required: ['type'],
                type: 'object',
                properties: {
                  meta: {
                    type: 'object',
                    properties: {
                      forgotten_password_url: {
                        type: 'string',
                        description: 'URL to institution forgotten password page',
                        'x-go-name': 'ForgottenPasswordUrl',
                        examples: ['https://example.com/forgotten-password'],
                      },
                      login_id_caption: {
                        type: 'string',
                        description: 'Login ID field caption that should be shown on UI',
                        'x-go-name': 'LoginIdCaption',
                        examples: ['User name'],
                      },
                      password_caption: {
                        type: 'string',
                        description: 'Password field caption that should be shown on UI',
                        'x-go-name': 'PasswordCaption',
                        examples: ['Password'],
                      },
                      secondary_login_id_caption: {
                        type: 'string',
                        description: 'Secondary loginID caption that should be shown on UI',
                        'x-go-name': 'SecondaryLoginIdCaption',
                        examples: ['Secondary login id'],
                      },
                      security_code_caption: {
                        type: 'string',
                        description: 'Security code caption that should be shown on UI',
                        'x-go-name': 'SecurityCodeCaption',
                        examples: ['Security code'],
                      },
                    },
                  },
                  type: {
                    type: 'string',
                    description:
                      'Authorization type identifier\nuser AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier\n\n`user` `token` `other` `user-mfa` `user-mfa-intermittent`',
                    enum: ['user', 'token', 'other', 'user-mfa', 'user-mfa-intermittent'],
                    'x-go-enum-desc':
                      'user AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier',
                    'x-go-name': 'Type',
                    examples: ['user'],
                  },
                },
              },
              id: {
                maxLength: 7,
                minLength: 7,
                pattern: '^[A-Z]{2}[0-9]{5}$',
                type: 'string',
                description: 'Institution ID',
                examples: ['AU00000'],
              },
              institution: {
                required: ['country', 'logo', 'name', 'shortName', 'tier', 'type'],
                type: 'object',
                properties: {
                  country: {
                    type: 'string',
                    description: 'Institution country name',
                    'x-go-name': 'Country',
                    examples: ['Australia'],
                  },
                  logo: {
                    required: ['links', 'type'],
                    type: 'object',
                    properties: {
                      colors: {
                        type: 'object',
                        properties: {
                          primary: {
                            type: 'string',
                            description: 'Primary primary institution color',
                            'x-go-name': 'Primary',
                          },
                        },
                        description: 'Colors contains institution colors type',
                      },
                      links: {
                        required: ['full', 'square'],
                        type: 'object',
                        properties: {
                          full: {
                            type: 'string',
                            description: 'URL to full size logo',
                            'x-go-name': 'Full',
                            examples: ['https://example.com/AU00000-full.svg'],
                          },
                          square: {
                            type: 'string',
                            description: 'Square formatted logo URL',
                            'x-go-name': 'Square',
                            examples: ['https://example.com/AU00000.svg'],
                          },
                        },
                        description: 'LogoResourceLinks contains institution logo resource links',
                      },
                      type: {
                        type: 'string',
                        description:
                          'Resource type identifier.\nimage ImageResourceType\n\n`image`',
                        enum: ['image'],
                        'x-go-enum-desc': 'image ImageResourceType',
                        'x-go-name': 'Type',
                        examples: ['image'],
                      },
                    },
                    description: 'InstitutionLogoResource linstitution logo resource type',
                  },
                  name: {
                    type: 'string',
                    description: 'Institution name',
                    'x-go-name': 'Name',
                    examples: ['Hooli Bank'],
                  },
                  shortName: {
                    type: 'string',
                    description: 'Institution short name',
                    'x-go-name': 'ShortName',
                    examples: ['Hooli'],
                  },
                  tier: {
                    type: 'string',
                    description:
                      'Institution tier identifier\n1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution\n\n`1` `2` `3` `4`',
                    enum: ['1', '2', '3', '4'],
                    'x-go-enum-desc':
                      '1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution',
                    'x-go-name': 'Tier',
                    examples: ['1'],
                  },
                  type: {
                    type: 'string',
                    description:
                      'Institution type identifier\nBank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions\n\n`Bank` `Bank (Foreign)` `Test Bank` `Credit Union` `Financial Services` `Superannuation` `Building Society` `Government`',
                    enum: [
                      'Bank',
                      'Bank (Foreign)',
                      'Test Bank',
                      'Credit Union',
                      'Financial Services',
                      'Superannuation',
                      'Building Society',
                      'Government',
                    ],
                    'x-go-enum-desc':
                      'Bank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions',
                    'x-go-name': 'Type',
                    examples: ['Bank'],
                  },
                },
                description: 'ConnectorInstitutionResource connector Institution  resource type',
              },
              links: {
                required: ['self'],
                type: 'object',
                properties: {
                  self: {
                    type: 'string',
                    description: 'URL to resource itself',
                    'x-go-name': 'Self',
                  },
                },
                description: 'ResourceLinks contains resource links',
              },
              method: {
                type: 'string',
                description: 'Current Connector method',
                examples: ['web'],
              },
              scopes: {
                type: 'array',
                description: 'Connector scopes array',
                items: { type: 'string' },
              },
              stage: { type: 'string', description: 'Current Connector stage', examples: ['beta'] },
              stats: {
                type: 'object',
                properties: {
                  averageDurationMs: {
                    type: 'object',
                    properties: {
                      retrieveAccounts: {
                        type: 'integer',
                        description:
                          'Connector average duration in milliseconds of <b>fetch accounts</b> step for institution',
                        format: 'int64',
                        'x-go-name': 'RetrieveAccounts',
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      retrieveMeta: {
                        type: 'integer',
                        description:
                          'Connector average duration in milliseconds of <b>fetch metadata</b> step for institution',
                        format: 'int64',
                        'x-go-name': 'RetrieveMeta',
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      retrieveTransactions: {
                        type: 'integer',
                        description:
                          'Connector average duration in milliseconds of <b>fetch transactions</b> step for institution',
                        format: 'int64',
                        'x-go-name': 'RetrieveTransactions',
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      total: {
                        type: 'integer',
                        description: 'Total connector average duration in milliseconds',
                        format: 'int64',
                        'x-go-name': 'Total',
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                      verifyCredentials: {
                        type: 'integer',
                        description:
                          'Connector average duration in milliseconds of <b>verifiy credentials</b> step for institution',
                        format: 'int64',
                        'x-go-name': 'VerifyCredentials',
                        minimum: -9223372036854776000,
                        maximum: 9223372036854776000,
                      },
                    },
                    description:
                      'AverageDurationMs average connector duration in milliseconds per segments.\nWhen durations are not known for institution this field will be `null`.',
                    'x-go-name': 'AverageDurationMs',
                  },
                },
                description:
                  'InstitutionPerformanceStats response type for institution performance stats',
              },
              status: {
                type: 'string',
                description:
                  'FeatureCondition type that describes an feature status for institution',
              },
              type: {
                type: 'string',
                description:
                  'Resource type identifier. It is always "connector" for this model.\nconnector ConnectorEntityType\n\n`connector`',
                enum: ['connector'],
                examples: ['connector'],
              },
            },
            description: 'Connector contains connector data.',
          },
          'x-go-name': 'Connectors',
        },
        links: {
          required: ['self'],
          type: 'object',
          properties: {
            self: { type: 'string', description: 'URL to resource itself', 'x-go-name': 'Self' },
          },
          description: 'ResourceLinks contains resource links',
        },
        totalCount: {
          type: 'integer',
          description: 'TotalCount contains total count of connectors',
          format: 'int64',
          'x-go-name': 'TotalCount',
          examples: [1],
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        type: { type: 'string', description: 'ResponseFormat identifies response data format' },
      },
      description: 'ConnectorsList contains list of connectors data.',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`unauthorized-access` `invalid-authorization-token`',
                enum: ['unauthorized-access', 'invalid-authorization-token'],
                examples: ['unauthorized-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['You are not authorized to access this resource'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Unauthorized Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetTransaction = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user.',
          },
          transactionId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the transaction.',
          },
        },
        required: ['userId', 'transactionId'],
      },
    ],
  },
  response: {
    '200': {
      required: [
        'account',
        'amount',
        'balance',
        'class',
        'connection',
        'description',
        'direction',
        'enrich',
        'id',
        'institution',
        'links',
        'postDate',
        'status',
        'transactionDate',
        'type',
      ],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Value is "transaction".', examples: ['transaction'] },
        id: {
          type: 'string',
          description:
            "Uniquely identifies the transaction for this connection. Note that when a connection is refreshed pending transactions will receive new id's, whilst posted transactions will receive the same id's as before the refresh.",
          examples: ['d3de1ca1'],
        },
        account: {
          type: 'string',
          description: 'The id of the account resource the transaction belongs to.',
          examples: ['d3de1ca1'],
        },
        amount: {
          type: 'string',
          description: 'Transaction amount. Outgoing funds are expressed as negative values.',
          examples: ['123.12'],
        },
        balance: {
          type: 'string',
          description: 'Value of the account balance at time the transaction was completed.',
          examples: ['123.12'],
        },
        class: {
          type: 'string',
          description:
            'Describes the class(type) of transaction.\n\n`bank-fee` `payment` `cash-withdrawal` `transfer` `loan-interest` `refund` `direct-credit` `interest` `loan-repayment`',
          enum: [
            'bank-fee',
            'payment',
            'cash-withdrawal',
            'transfer',
            'loan-interest',
            'refund',
            'direct-credit',
            'interest',
            'loan-repayment',
          ],
          examples: ['payment'],
        },
        connection: {
          type: 'string',
          description:
            'The id of the connection resource that was used to retrieve the transaction.',
          examples: ['d3de1ca1'],
        },
        description: {
          type: 'string',
          description: 'The transaction description as submitted by the institution..',
        },
        direction: {
          type: 'string',
          description:
            'Identifies if the transaction is of debit or credit type.\n\n`debit` `credit`',
          enum: ['debit', 'credit'],
          examples: ['debit'],
        },
        enrich: {
          required: ['category', 'location', 'merchant'],
          type: 'object',
          properties: {
            category: {
              type: 'object',
              properties: {
                anzsic: {
                  type: 'object',
                  properties: {
                    class: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string',
                          description: 'Class Details',
                          examples: ['Cafes and Restaurants'],
                        },
                        code: { type: 'string', description: 'Class Code', examples: ['4511'] },
                      },
                    },
                    division: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string',
                          description: 'Division Details',
                          examples: ['Accommodation and  Food Services'],
                        },
                        code: { type: 'string', description: 'Division Code', examples: ['H'] },
                      },
                    },
                    group: {
                      type: 'object',
                      properties: {
                        code: { type: 'string', description: 'Group Code', examples: ['451'] },
                        title: {
                          type: 'string',
                          description: 'Group Details',
                          examples: ['Cafes, Restaurants and Takeaway Food Services'],
                        },
                      },
                    },
                    subdivision: {
                      type: 'object',
                      properties: {
                        code: { type: 'string', description: 'Subdivision Code', examples: ['45'] },
                        title: {
                          type: 'string',
                          description: 'Subdivision Details',
                          examples: ['Food and Beverage Services'],
                        },
                      },
                    },
                  },
                },
              },
            },
            location: {
              type: 'object',
              properties: {
                country: { type: 'string', description: 'Country', examples: ['Australia'] },
                formattedAddress: {
                  type: 'string',
                  description: 'Address',
                  examples: ['1/39 E Esplanade, Manly NSW 2095'],
                },
                geometry: {
                  type: 'object',
                  properties: {
                    lat: {
                      type: 'string',
                      description: 'Latitude',
                      examples: ['-33.79988520000001'],
                    },
                    lng: { type: 'string', description: 'Longitude', examples: ['151.2858021'] },
                  },
                },
                postalCode: { type: 'string', description: 'Postal Code', examples: ['2095'] },
                route: { type: 'string', description: 'Route Name', examples: ['E Esplanade'] },
                routeNo: { type: 'string', description: 'Route Number', examples: ['29'] },
                state: { type: 'string', description: 'State', examples: ['NSW'] },
                suburb: { type: 'string', description: 'Suburb', examples: ['Manly'] },
              },
            },
            merchant: {
              required: ['id', 'businessName', 'ABN', 'website', 'logoMaster', 'logoThumb'],
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'id',
                  examples: ['ae4a051c-4791-11e8-8750-0a87c0279fe8'],
                },
                businessName: {
                  type: 'string',
                  description: 'Merchant name',
                  examples: ['Garfish Manly'],
                },
                ABN: { type: 'string', description: 'ABN', examples: [90065628864] },
                logoMaster: {
                  type: 'string',
                  description: 'full merchant logo',
                  examples: [
                    'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-master.png',
                  ],
                },
                logoThumb: {
                  type: 'string',
                  description: 'thumbnail merchant logo',
                  examples: [
                    'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-thumb.png',
                  ],
                },
                phoneNumber: {
                  type: 'object',
                  properties: {
                    international: {
                      type: 'string',
                      description: 'International Phone Number',
                      examples: ['+61 2 9977 0707'],
                    },
                    local: {
                      type: 'string',
                      description: 'Local Phone Number',
                      examples: ['(02) 9977 0707'],
                    },
                  },
                },
                website: {
                  type: 'string',
                  description: 'Merchant Website',
                  examples: ['http://garfish.com.au/garfish-manly/'],
                },
              },
            },
          },
        },
        institution: {
          type: 'string',
          description: 'The id of the institution resource the transaction originated from.',
          examples: ['AU00000'],
        },
        postDate: {
          type: 'string',
          description:
            'Date the transaction was posted as provided by the institution (this is the same date that appears on a bank statement). This value is null if the record is pending. e.g. "2017-11-10T21:46:44Z" or 2017-11-10T00:00:00Z.',
          examples: ['2018-11-02T00:00:00Z'],
        },
        status: {
          type: 'string',
          description:
            'Identifies if a transaction is pending or posted. A pending transaction is an approved debit or credit transaction that has not been fully processed yet (i.e. has not been posted). Find out more about pending transaction and how to deal with them within your app. Note that pending transactions are not available for all institutions.\n\n`pending` `posted`',
          enum: ['pending', 'posted'],
          examples: ['pending'],
        },
        transactionDate: {
          type: 'string',
          description:
            'Date that the user executed the transaction as provided by the istitution. Note that not all transactions provide this value (varies by institution) e.g. "2017-11-10T00:00:00Z"',
          examples: ['2018-11-02T00:00:00.000Z'],
        },
        links: {
          required: ['account', 'connection', 'institution', 'self'],
          type: 'object',
          properties: {
            account: {
              type: 'string',
              description: 'Url of the account.',
              examples: ['https://au-api.basiq.io/users/6a52015e/accounts/31eb30a0'],
            },
            institution: {
              type: 'string',
              description: 'Url of the institution.',
              examples: ['https://au-api.basiq.io/institutions/AU00000'],
            },
            self: {
              type: 'string',
              description: 'Transaction self reference.',
              examples: ['https://au-api.basiq.io/users/6a52015e/transactions/2082c765'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
              },
              code: {
                type: 'object',
                description: 'Application-specific error code, expressed as a string value.',
                examples: ['service-unavailable'],
                additionalProperties: true,
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Service Unavailable. Try again later.'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetTransactions = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'User identifier.',
          },
        },
        required: ['userId'],
      },
      {
        type: 'object',
        properties: {
          limit: {
            type: 'integer',
            format: 'int64',
            default: 500,
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'This represents the maximum number of items that may be included in the response (maximum of 500). Note that by default 500 items are returned if this value is not specified.',
          },
          filter: {
            type: 'string',
            enum: [
              'account.id',
              'transaction.postDate',
              'transaction.status',
              'institution.id',
              'transaction.direction',
              'transaction.class',
            ],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Transaction filters.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      title: 'Transactions container object.',
      required: ['count', 'data', 'size', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Value is "list".', examples: ['list'] },
        count: {
          type: 'integer',
          description: 'Count of the transactions in the response.',
          format: 'int64',
          examples: [100],
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        size: {
          type: 'integer',
          format: 'int64',
          examples: [500],
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        data: {
          type: 'array',
          items: {
            required: [
              'account',
              'amount',
              'balance',
              'class',
              'connection',
              'description',
              'direction',
              'enrich',
              'id',
              'institution',
              'links',
              'postDate',
              'status',
              'transactionDate',
              'type',
            ],
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Value is "transaction".',
                examples: ['transaction'],
              },
              id: {
                type: 'string',
                description:
                  "Uniquely identifies the transaction for this connection. Note that when a connection is refreshed pending transactions will receive new id's, whilst posted transactions will receive the same id's as before the refresh.",
                examples: ['d3de1ca1'],
              },
              account: {
                type: 'string',
                description: 'The id of the account resource the transaction belongs to.',
                examples: ['d3de1ca1'],
              },
              amount: {
                type: 'string',
                description: 'Transaction amount. Outgoing funds are expressed as negative values.',
                examples: ['123.12'],
              },
              balance: {
                type: 'string',
                description: 'Value of the account balance at time the transaction was completed.',
                examples: ['123.12'],
              },
              class: {
                type: 'string',
                description:
                  'Describes the class(type) of transaction.\n\n`bank-fee` `payment` `cash-withdrawal` `transfer` `loan-interest` `refund` `direct-credit` `interest` `loan-repayment`',
                enum: [
                  'bank-fee',
                  'payment',
                  'cash-withdrawal',
                  'transfer',
                  'loan-interest',
                  'refund',
                  'direct-credit',
                  'interest',
                  'loan-repayment',
                ],
                examples: ['payment'],
              },
              connection: {
                type: 'string',
                description:
                  'The id of the connection resource that was used to retrieve the transaction.',
                examples: ['d3de1ca1'],
              },
              description: {
                type: 'string',
                description: 'The transaction description as submitted by the institution..',
              },
              direction: {
                type: 'string',
                description:
                  'Identifies if the transaction is of debit or credit type.\n\n`debit` `credit`',
                enum: ['debit', 'credit'],
                examples: ['debit'],
              },
              enrich: {
                required: ['category', 'location', 'merchant'],
                type: 'object',
                properties: {
                  category: {
                    type: 'object',
                    properties: {
                      anzsic: {
                        type: 'object',
                        properties: {
                          class: {
                            type: 'object',
                            properties: {
                              title: {
                                type: 'string',
                                description: 'Class Details',
                                examples: ['Cafes and Restaurants'],
                              },
                              code: {
                                type: 'string',
                                description: 'Class Code',
                                examples: ['4511'],
                              },
                            },
                          },
                          division: {
                            type: 'object',
                            properties: {
                              title: {
                                type: 'string',
                                description: 'Division Details',
                                examples: ['Accommodation and  Food Services'],
                              },
                              code: {
                                type: 'string',
                                description: 'Division Code',
                                examples: ['H'],
                              },
                            },
                          },
                          group: {
                            type: 'object',
                            properties: {
                              code: {
                                type: 'string',
                                description: 'Group Code',
                                examples: ['451'],
                              },
                              title: {
                                type: 'string',
                                description: 'Group Details',
                                examples: ['Cafes, Restaurants and Takeaway Food Services'],
                              },
                            },
                          },
                          subdivision: {
                            type: 'object',
                            properties: {
                              code: {
                                type: 'string',
                                description: 'Subdivision Code',
                                examples: ['45'],
                              },
                              title: {
                                type: 'string',
                                description: 'Subdivision Details',
                                examples: ['Food and Beverage Services'],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  location: {
                    type: 'object',
                    properties: {
                      country: { type: 'string', description: 'Country', examples: ['Australia'] },
                      formattedAddress: {
                        type: 'string',
                        description: 'Address',
                        examples: ['1/39 E Esplanade, Manly NSW 2095'],
                      },
                      geometry: {
                        type: 'object',
                        properties: {
                          lat: {
                            type: 'string',
                            description: 'Latitude',
                            examples: ['-33.79988520000001'],
                          },
                          lng: {
                            type: 'string',
                            description: 'Longitude',
                            examples: ['151.2858021'],
                          },
                        },
                      },
                      postalCode: {
                        type: 'string',
                        description: 'Postal Code',
                        examples: ['2095'],
                      },
                      route: {
                        type: 'string',
                        description: 'Route Name',
                        examples: ['E Esplanade'],
                      },
                      routeNo: { type: 'string', description: 'Route Number', examples: ['29'] },
                      state: { type: 'string', description: 'State', examples: ['NSW'] },
                      suburb: { type: 'string', description: 'Suburb', examples: ['Manly'] },
                    },
                  },
                  merchant: {
                    required: ['id', 'businessName', 'ABN', 'website', 'logoMaster', 'logoThumb'],
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'id',
                        examples: ['ae4a051c-4791-11e8-8750-0a87c0279fe8'],
                      },
                      businessName: {
                        type: 'string',
                        description: 'Merchant name',
                        examples: ['Garfish Manly'],
                      },
                      ABN: { type: 'string', description: 'ABN', examples: [90065628864] },
                      logoMaster: {
                        type: 'string',
                        description: 'full merchant logo',
                        examples: [
                          'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-master.png',
                        ],
                      },
                      logoThumb: {
                        type: 'string',
                        description: 'thumbnail merchant logo',
                        examples: [
                          'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-thumb.png',
                        ],
                      },
                      phoneNumber: {
                        type: 'object',
                        properties: {
                          international: {
                            type: 'string',
                            description: 'International Phone Number',
                            examples: ['+61 2 9977 0707'],
                          },
                          local: {
                            type: 'string',
                            description: 'Local Phone Number',
                            examples: ['(02) 9977 0707'],
                          },
                        },
                      },
                      website: {
                        type: 'string',
                        description: 'Merchant Website',
                        examples: ['http://garfish.com.au/garfish-manly/'],
                      },
                    },
                  },
                },
              },
              institution: {
                type: 'string',
                description: 'The id of the institution resource the transaction originated from.',
                examples: ['AU00000'],
              },
              postDate: {
                type: 'string',
                description:
                  'Date the transaction was posted as provided by the institution (this is the same date that appears on a bank statement). This value is null if the record is pending. e.g. "2017-11-10T21:46:44Z" or 2017-11-10T00:00:00Z.',
                examples: ['2018-11-02T00:00:00Z'],
              },
              status: {
                type: 'string',
                description:
                  'Identifies if a transaction is pending or posted. A pending transaction is an approved debit or credit transaction that has not been fully processed yet (i.e. has not been posted). Find out more about pending transaction and how to deal with them within your app. Note that pending transactions are not available for all institutions.\n\n`pending` `posted`',
                enum: ['pending', 'posted'],
                examples: ['pending'],
              },
              transactionDate: {
                type: 'string',
                description:
                  'Date that the user executed the transaction as provided by the istitution. Note that not all transactions provide this value (varies by institution) e.g. "2017-11-10T00:00:00Z"',
                examples: ['2018-11-02T00:00:00.000Z'],
              },
              links: {
                required: ['account', 'connection', 'institution', 'self'],
                type: 'object',
                properties: {
                  account: {
                    type: 'string',
                    description: 'Url of the account.',
                    examples: ['https://au-api.basiq.io/users/6a52015e/accounts/31eb30a0'],
                  },
                  institution: {
                    type: 'string',
                    description: 'Url of the institution.',
                    examples: ['https://au-api.basiq.io/institutions/AU00000'],
                  },
                  self: {
                    type: 'string',
                    description: 'Transaction self reference.',
                    examples: ['https://au-api.basiq.io/users/6a52015e/transactions/2082c765'],
                  },
                },
              },
            },
          },
        },
        links: {
          required: ['self'],
          type: 'object',
          properties: {
            self: {
              type: 'string',
              description: 'Self reference url.',
              examples: ['https://au-api.basiq.io/users/ea3a81/transactions'],
            },
            next: {
              type: 'string',
              description: 'Url to next result.',
              examples: ['https://au-api.basiq.io/users/6a52015e/transactions?next=bf1ec9d4'],
            },
          },
        },
      },
      description:
        'A transaction object is created whenever money is debited or credited from a particular account.',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const RefreshConnection = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user.',
          },
          connectionId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the connection.',
          },
        },
        required: ['userId', 'connectionId'],
      },
    ],
  },
  response: {
    '202': {
      title: 'ConnectionResponseResource',
      required: ['id', 'links', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Type, always "job".', examples: ['job'] },
        id: { type: 'string', description: 'Job identification.', examples: ['29523951'] },
        links: {
          title: 'ResourceLink',
          required: ['self'],
          type: 'object',
          properties: {
            self: {
              type: 'string',
              description: 'URL of the resource.',
              examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
            },
          },
          description: 'Link object containing a link to the resource, self reference.',
        },
      },
      description: 'Object containing details for connection post.',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
              },
              code: {
                type: 'object',
                description: 'Application-specific error code, expressed as a string value.',
                examples: ['service-unavailable'],
                additionalProperties: true,
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Service Unavailable. Try again later.'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const RefreshConnections = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user.',
          },
        },
        required: ['userId'],
      },
    ],
  },
  response: {
    '202': {
      title: 'ConnectionsRefreshResource',
      required: ['data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Type, always "list".', examples: ['list'] },
        data: {
          type: 'array',
          description: 'Job details data.',
          items: {
            title: 'ConnectionResponseResource',
            required: ['id', 'links', 'type'],
            type: 'object',
            properties: {
              type: { type: 'string', description: 'Type, always "job".', examples: ['job'] },
              id: { type: 'string', description: 'Job identification.', examples: ['29523951'] },
              links: {
                title: 'ResourceLink',
                required: ['self'],
                type: 'object',
                properties: {
                  self: {
                    type: 'string',
                    description: 'URL of the resource.',
                    examples: ['https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'],
                  },
                },
                description: 'Link object containing a link to the resource, self reference.',
              },
            },
            description: 'Object containing details for connection post.',
          },
        },
      },
      description: 'Object containing details for connections refresh.',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`',
                enum: [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials',
                ],
                examples: ['parameter-not-valid'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['ID value is not valid.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'source', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`',
                enum: ['forbidden-access', 'no-production-access', 'access-denied'],
                examples: ['forbidden-access'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Access to this resource is forbidden.'],
              },
              source: {
                title: 'Source',
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'String indicating which URI query parameter caused the error.',
                    examples: ['userId'],
                  },
                  pointer: {
                    type: 'string',
                    description: 'Location to the object or attribute that the error relates to.',
                    examples: ['users/userId'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Forbidden Access'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`resource-not-found`',
                enum: ['resource-not-found'],
                examples: ['resource-not-found'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Resource not found.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Requested resource is not found.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      required: ['correlationId', 'data', 'type'],
      type: 'object',
      properties: {
        correlationId: {
          type: 'string',
          description: 'Unique identifier for this particular occurrence of the problem.',
          examples: ['ac5ah5i'],
        },
        data: {
          type: 'array',
          description: 'Error data.',
          items: {
            required: ['code', 'type'],
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Application-specific error code, expressed as a string value.\n\n`internal-server-error`',
                enum: ['internal-server-error'],
                examples: ['internal-server-error'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
                examples: ['Internal Server error. Contact support.'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Internal Server error.'],
              },
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
            },
          },
        },
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
export {
  DeleteConnection,
  GetAccount,
  GetAccounts,
  GetConnection,
  GetConnections,
  GetConnector,
  GetConnectors,
  GetTransaction,
  GetTransactions,
  RefreshConnection,
  RefreshConnections,
};
