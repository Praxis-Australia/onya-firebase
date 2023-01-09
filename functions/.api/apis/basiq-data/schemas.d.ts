declare const DeleteConnection: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the user.';
          };
          readonly connectionId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the connection.';
          };
        };
        readonly required: readonly ['userId', 'connectionId'];
      }
    ];
  };
  readonly response: {
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '503': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Service Unavailable'];
              };
              readonly code: {
                readonly type: 'object';
                readonly description: 'Application-specific error code, expressed as a string value.';
                readonly examples: readonly ['service-unavailable'];
                readonly additionalProperties: true;
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Service Unavailable. Try again later.'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetAccount: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'User identifier';
          };
          readonly accountId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'Account identifier';
          };
        };
        readonly required: readonly ['userId', 'accountId'];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'AccountResponseResource';
      readonly required: readonly [
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
        'type'
      ];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "account".';
          readonly examples: readonly ['account'];
        };
        readonly id: {
          readonly type: 'string';
          readonly description: 'Uniquely identifies the account.';
          readonly examples: readonly ['s55bf3'];
        };
        readonly accountHolder: {
          readonly type: 'string';
          readonly description: 'The name of the account holder as returned by the institution. No formatting is applied. Returns a string or null when not available.';
          readonly examples: readonly ['GAVIN BELSON'];
        };
        readonly accountNo: {
          readonly type: 'string';
          readonly description: 'Full account number.';
          readonly examples: readonly ['600000-157441965'];
        };
        readonly availableFunds: {
          readonly type: 'string';
          readonly description: 'Funds that are available to an account holder for withdrawal or other use. This may include funds from an overdraft facility or line of credit. As well as funds classified as the available balance, such as from cleared and existing deposits.';
          readonly examples: readonly ['420.28'];
        };
        readonly balance: {
          readonly type: 'string';
          readonly description: 'Amount of funds in the account right now - excluding any pending transactions. For a credit card this would be zero or the minus amount spent.';
          readonly examples: readonly ['356.50'];
        };
        readonly class: {
          readonly type: 'array';
          readonly description: 'Describes the class(type) of accounts.\ntransaction, savings, credit-card, mortgage, loan, investment, term-deposit, insurance, foreign, unknown.';
          readonly items: {
            readonly required: readonly ['type', 'product'];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Account type';
                readonly examples: readonly ['savings'];
              };
              readonly product: {
                readonly type: 'string';
                readonly description: 'Product name.';
                readonly examples: readonly ['saver'];
              };
            };
          };
        };
        readonly connection: {
          readonly type: 'string';
          readonly description: 'The id of the connection resource that was used to retrieve the account.';
          readonly examples: readonly ['8fce3b'];
        };
        readonly currency: {
          readonly type: 'string';
          readonly description: 'The currency the funds are stored in, using ISO 4217 standard.';
          readonly examples: readonly ['AUD'];
        };
        readonly institution: {
          readonly type: 'string';
          readonly description: 'The id of the institution resource the account originated from.';
          readonly examples: readonly ['AU00000'];
        };
        readonly lastUpdated: {
          readonly type: 'string';
          readonly description: 'Timestamp of last update, UTC, RFC 3339 format e.g. "2017-09-28T13:39:33Z"';
          readonly examples: readonly ['2019-09-28T13:39:33Z'];
        };
        readonly name: {
          readonly type: 'string';
          readonly description: 'Account name as defined by institution or user.';
          readonly examples: readonly ['Master Savings'];
        };
        readonly status: {
          readonly type: 'string';
          readonly description: 'Account status\n\n`available` `unavailable`';
          readonly enum: readonly ['available', 'unavailable'];
          readonly examples: readonly ['available'];
        };
        readonly transactionIntervals: {
          readonly type: 'array';
          readonly description: 'An array of date intervals indicating the coverage of the transaction data relating to the account.\nWill return a single element for accounts sourced from a single bank connection.\nWill return multiple elements in cases where there have been multiple PDF/CSV uploads for an account.';
          readonly items: {
            readonly required: readonly ['from', 'to'];
            readonly type: 'object';
            readonly properties: {
              readonly from: {
                readonly type: 'string';
                readonly description: 'Date of first transaction on this account';
                readonly examples: readonly ['2018-07-01'];
              };
              readonly to: {
                readonly type: 'string';
                readonly description: 'Date of last transaction on this account';
                readonly examples: readonly ['2018-12-30'];
              };
            };
          };
        };
        readonly links: {
          readonly required: readonly ['connection', 'institution', 'self', 'transactions'];
          readonly type: 'object';
          readonly properties: {
            readonly institution: {
              readonly type: 'string';
              readonly description: 'institution link to the institution associated with this account';
              readonly examples: readonly ['https://au-api.basiq.io/institutions/AU00000'];
            };
            readonly transactions: {
              readonly type: 'string';
              readonly description: 'transactions link to the transactions associated with this account';
              readonly examples: readonly [
                "https://au-api.basiq.io/users/ea3a81/transactions?filter=account.id.eq('s55bf3')"
              ];
            };
            readonly self: {
              readonly type: 'string';
              readonly description: 'self link to the requested account';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
              ];
            };
          };
        };
      };
      readonly description: 'Container object with account details';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetAccounts: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'User identifier';
          };
        };
        readonly required: readonly ['userId'];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly required: readonly ['data', 'links', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Type of the response, always "list".';
          readonly examples: readonly ['list'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Container object, containing account details.';
          readonly items: {
            readonly title: 'AccountResponseResource';
            readonly required: readonly [
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
              'type'
            ];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Always "account".';
                readonly examples: readonly ['account'];
              };
              readonly id: {
                readonly type: 'string';
                readonly description: 'Uniquely identifies the account.';
                readonly examples: readonly ['s55bf3'];
              };
              readonly accountHolder: {
                readonly type: 'string';
                readonly description: 'The name of the account holder as returned by the institution. No formatting is applied. Returns a string or null when not available.';
                readonly examples: readonly ['GAVIN BELSON'];
              };
              readonly accountNo: {
                readonly type: 'string';
                readonly description: 'Full account number.';
                readonly examples: readonly ['600000-157441965'];
              };
              readonly availableFunds: {
                readonly type: 'string';
                readonly description: 'Funds that are available to an account holder for withdrawal or other use. This may include funds from an overdraft facility or line of credit. As well as funds classified as the available balance, such as from cleared and existing deposits.';
                readonly examples: readonly ['420.28'];
              };
              readonly balance: {
                readonly type: 'string';
                readonly description: 'Amount of funds in the account right now - excluding any pending transactions. For a credit card this would be zero or the minus amount spent.';
                readonly examples: readonly ['356.50'];
              };
              readonly class: {
                readonly type: 'array';
                readonly description: 'Describes the class(type) of accounts.\ntransaction, savings, credit-card, mortgage, loan, investment, term-deposit, insurance, foreign, unknown.';
                readonly items: {
                  readonly required: readonly ['type', 'product'];
                  readonly type: 'object';
                  readonly properties: {
                    readonly type: {
                      readonly type: 'string';
                      readonly description: 'Account type';
                      readonly examples: readonly ['savings'];
                    };
                    readonly product: {
                      readonly type: 'string';
                      readonly description: 'Product name.';
                      readonly examples: readonly ['saver'];
                    };
                  };
                };
              };
              readonly connection: {
                readonly type: 'string';
                readonly description: 'The id of the connection resource that was used to retrieve the account.';
                readonly examples: readonly ['8fce3b'];
              };
              readonly currency: {
                readonly type: 'string';
                readonly description: 'The currency the funds are stored in, using ISO 4217 standard.';
                readonly examples: readonly ['AUD'];
              };
              readonly institution: {
                readonly type: 'string';
                readonly description: 'The id of the institution resource the account originated from.';
                readonly examples: readonly ['AU00000'];
              };
              readonly lastUpdated: {
                readonly type: 'string';
                readonly description: 'Timestamp of last update, UTC, RFC 3339 format e.g. "2017-09-28T13:39:33Z"';
                readonly examples: readonly ['2019-09-28T13:39:33Z'];
              };
              readonly name: {
                readonly type: 'string';
                readonly description: 'Account name as defined by institution or user.';
                readonly examples: readonly ['Master Savings'];
              };
              readonly status: {
                readonly type: 'string';
                readonly description: 'Account status\n\n`available` `unavailable`';
                readonly enum: readonly ['available', 'unavailable'];
                readonly examples: readonly ['available'];
              };
              readonly transactionIntervals: {
                readonly type: 'array';
                readonly description: 'An array of date intervals indicating the coverage of the transaction data relating to the account.\nWill return a single element for accounts sourced from a single bank connection.\nWill return multiple elements in cases where there have been multiple PDF/CSV uploads for an account.';
                readonly items: {
                  readonly required: readonly ['from', 'to'];
                  readonly type: 'object';
                  readonly properties: {
                    readonly from: {
                      readonly type: 'string';
                      readonly description: 'Date of first transaction on this account';
                      readonly examples: readonly ['2018-07-01'];
                    };
                    readonly to: {
                      readonly type: 'string';
                      readonly description: 'Date of last transaction on this account';
                      readonly examples: readonly ['2018-12-30'];
                    };
                  };
                };
              };
              readonly links: {
                readonly required: readonly ['connection', 'institution', 'self', 'transactions'];
                readonly type: 'object';
                readonly properties: {
                  readonly institution: {
                    readonly type: 'string';
                    readonly description: 'institution link to the institution associated with this account';
                    readonly examples: readonly ['https://au-api.basiq.io/institutions/AU00000'];
                  };
                  readonly transactions: {
                    readonly type: 'string';
                    readonly description: 'transactions link to the transactions associated with this account';
                    readonly examples: readonly [
                      "https://au-api.basiq.io/users/ea3a81/transactions?filter=account.id.eq('s55bf3')"
                    ];
                  };
                  readonly self: {
                    readonly type: 'string';
                    readonly description: 'self link to the requested account';
                    readonly examples: readonly [
                      'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
                    ];
                  };
                };
              };
            };
            readonly description: 'Container object with account details';
          };
        };
        readonly links: {
          readonly title: 'ResourceLink';
          readonly required: readonly ['self'];
          readonly type: 'object';
          readonly properties: {
            readonly self: {
              readonly type: 'string';
              readonly description: 'URL of the resource.';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
              ];
            };
          };
          readonly description: 'Link object containing a link to the resource, self reference.';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetConnection: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the user.';
          };
          readonly connectionId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the connection.';
          };
        };
        readonly required: readonly ['userId', 'connectionId'];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'ConnectionGetResponseResource';
      readonly required: readonly ['createdDate', 'method', 'id', 'institution', 'links', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Type, always "connection".';
          readonly examples: readonly ['connection'];
        };
        readonly id: {
          readonly type: 'string';
          readonly description: 'A string that uniquely identifies the user connection.';
          readonly examples: readonly ['61723'];
        };
        readonly method: {
          readonly type: 'string';
          readonly description: 'A string that uniquely identifies the user connections either it is web or openbanking';
          readonly examples: readonly ['web'];
        };
        readonly createdDate: {
          readonly type: 'string';
          readonly description: 'Created date of the connection, available only for SERVER_SCOPE.';
          readonly examples: readonly ['2019-07-29T07:34:09Z'];
        };
        readonly lastUsed: {
          readonly type: 'string';
          readonly description: 'UTC Date and Time of when the connection was last used, in RFC 3339 format, available only for SERVER_SCOPE.';
          readonly examples: readonly ['2020-06-22T11:15:09Z'];
        };
        readonly accounts: {
          readonly required: readonly ['data', 'type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly type: 'string';
              readonly description: 'Type always "list".';
              readonly examples: readonly ['list'];
            };
            readonly data: {
              readonly type: 'array';
              readonly description: 'Accounts details';
              readonly items: {
                readonly required: readonly [
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
                  'type'
                ];
                readonly type: 'object';
                readonly properties: {
                  readonly type: {
                    readonly type: 'string';
                    readonly description: 'Type always "account".';
                    readonly examples: readonly ['account'];
                  };
                  readonly id: {
                    readonly type: 'string';
                    readonly description: 'Account identification.';
                    readonly examples: readonly ['319ae910'];
                  };
                  readonly name: {
                    readonly type: 'string';
                    readonly description: 'Account name.';
                    readonly examples: readonly ['Business account'];
                  };
                  readonly currency: {
                    readonly type: 'string';
                    readonly description: 'Currency';
                    readonly examples: readonly ['AUD'];
                  };
                  readonly class: {
                    readonly required: readonly ['type', 'product'];
                    readonly type: 'object';
                    readonly properties: {
                      readonly type: {
                        readonly type: 'string';
                        readonly description: 'Account type';
                        readonly examples: readonly ['savings'];
                      };
                      readonly product: {
                        readonly type: 'string';
                        readonly description: 'Product name.';
                        readonly examples: readonly ['saver'];
                      };
                    };
                  };
                  readonly accountNo: {
                    readonly type: 'string';
                    readonly description: 'Account number';
                    readonly examples: readonly ['105148119695'];
                  };
                  readonly availableFunds: {
                    readonly type: 'string';
                    readonly description: 'Account available funds, nullable.';
                    readonly examples: readonly ['200.54'];
                  };
                  readonly balance: {
                    readonly type: 'string';
                    readonly description: 'Account balance, nullable.';
                    readonly examples: readonly ['100.12'];
                  };
                  readonly lastUpdated: {
                    readonly type: 'string';
                    readonly description: 'Account last updated date and time.';
                    readonly examples: readonly ['2017-09-28T11:15:09.756Z'];
                  };
                  readonly status: {
                    readonly type: 'string';
                    readonly description: 'Account status.\n\n`available` `unavailable`';
                    readonly enum: readonly ['available', 'unavailable'];
                    readonly examples: readonly ['available'];
                  };
                  readonly links: {
                    readonly required: readonly ['self', 'transactions'];
                    readonly type: 'object';
                    readonly properties: {
                      readonly transactions: {
                        readonly type: 'string';
                        readonly description: 'transactions link to the transactions associated with this account';
                        readonly examples: readonly [
                          "https://au-api.basiq.io/users/ea3a81/transactions?filter=account.id.eq('s55bf3')"
                        ];
                      };
                      readonly self: {
                        readonly type: 'string';
                        readonly description: 'self link to the requested account';
                        readonly examples: readonly [
                          'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
                        ];
                      };
                    };
                  };
                };
              };
            };
          };
        };
        readonly institution: {
          readonly title: 'ConnectionInstitution';
          readonly required: readonly ['id', 'links', 'type'];
          readonly type: 'object';
          readonly properties: {
            readonly id: {
              readonly type: 'string';
              readonly description: 'Institution id';
              readonly examples: readonly ['AU00000'];
            };
            readonly links: {
              readonly title: 'ResourceLink';
              readonly required: readonly ['self'];
              readonly type: 'object';
              readonly properties: {
                readonly self: {
                  readonly type: 'string';
                  readonly description: 'URL of the resource.';
                  readonly examples: readonly [
                    'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
                  ];
                };
              };
              readonly description: 'Link object containing a link to the resource, self reference.';
            };
            readonly type: {
              readonly type: 'string';
              readonly description: 'Always "institution".';
              readonly examples: readonly ['institution'];
            };
          };
          readonly description: 'Institution details.';
        };
        readonly profile: {
          readonly required: readonly [
            'emailAddresses',
            'firstName',
            'fullName',
            'lastName',
            'middleName',
            'phoneNumbers',
            'physicalAddresses'
          ];
          readonly type: 'object';
          readonly properties: {
            readonly emailAddresses: {
              readonly type: 'array';
              readonly description: 'User email address';
              readonly items: {
                readonly type: 'string';
              };
              readonly examples: readonly ['gavin@hooli.com'];
            };
            readonly firstName: {
              readonly type: 'string';
              readonly description: 'User first name';
              readonly examples: readonly ['Gavin'];
            };
            readonly fullName: {
              readonly type: 'string';
              readonly description: 'User full name';
              readonly examples: readonly ['Gavin Belson'];
            };
            readonly lastName: {
              readonly type: 'string';
              readonly description: 'User last name';
              readonly examples: readonly ['Belson'];
            };
            readonly middleName: {
              readonly type: 'string';
              readonly description: 'User middle name';
            };
            readonly phoneNumbers: {
              readonly type: 'array';
              readonly description: 'User phone number';
              readonly items: {
                readonly type: 'string';
              };
              readonly examples: readonly ['XXXX 888 991'];
            };
            readonly physicalAddresses: {
              readonly type: 'array';
              readonly description: 'Physical user addresses';
              readonly items: {
                readonly title: 'PhysicalAddresses';
                readonly required: readonly [
                  'addressLine1',
                  'addressLine2',
                  'addressLine3',
                  'city',
                  'countryCode',
                  'formattedAddress',
                  'postcode',
                  'state'
                ];
                readonly type: 'object';
                readonly properties: {
                  readonly addressLine1: {
                    readonly type: 'string';
                    readonly description: 'User address.';
                    readonly examples: readonly ['13/91 Fisher Rd'];
                  };
                  readonly addressLine2: {
                    readonly type: 'string';
                    readonly description: 'Always "null"';
                  };
                  readonly addressLine3: {
                    readonly type: 'string';
                    readonly description: 'Always "null"';
                  };
                  readonly city: {
                    readonly type: 'string';
                    readonly description: 'City';
                    readonly examples: readonly ['Sydney'];
                  };
                  readonly country: {
                    readonly type: 'string';
                  };
                  readonly countryCode: {
                    readonly type: 'string';
                    readonly description: 'Country code';
                    readonly examples: readonly ['AU'];
                  };
                  readonly formattedAddress: {
                    readonly type: 'string';
                    readonly description: 'Address formatted.';
                    readonly examples: readonly ['13/91 Fisher Rd, Dee Why NSW 2099, Australia'];
                  };
                  readonly postcode: {
                    readonly type: 'string';
                    readonly description: 'Post code';
                    readonly examples: readonly ['2099'];
                  };
                  readonly state: {
                    readonly type: 'string';
                    readonly description: 'State';
                    readonly examples: readonly ['NSW'];
                  };
                };
                readonly description: 'User physical addresses holding the connection.';
              };
            };
          };
        };
        readonly status: {
          readonly type: 'string';
          readonly description: 'Indicates the connection status, available only for SERVER_SCOPE.\n\n`active` `pending` `invalid`';
          readonly enum: readonly ['active', 'pending', 'invalid'];
          readonly examples: readonly ['active'];
        };
        readonly links: {
          readonly title: 'GetConnectionLinks';
          readonly required: readonly ['self', 'user'];
          readonly type: 'object';
          readonly properties: {
            readonly accounts: {
              readonly type: 'string';
              readonly description: 'Accounts reference url.';
              readonly examples: readonly [
                "https://au-api.basiq.io/users/cd6fbd92/accounts?filter=institution.id.eq('AU00000')"
              ];
            };
            readonly self: {
              readonly type: 'string';
              readonly description: 'Connection self reference url.';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/cd6fbd92-0b12-43ba-a3c1-286dd5f4f396/connections/29523951'
              ];
            };
            readonly transactions: {
              readonly type: 'string';
              readonly description: 'Transactions reference url.';
              readonly examples: readonly [
                "https://au-api.basiq.io/users/cd6fbd92/transactions?filter=institution.id.eq('AU00000')"
              ];
            };
            readonly user: {
              readonly type: 'string';
              readonly description: 'User reference url.';
              readonly examples: readonly ['https://au-api.basiq.io/users/cd6fbd92'];
            };
          };
          readonly description: 'Object containing links to resources.';
        };
      };
      readonly description: 'Object containing details for connection post.';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`unauthorized-access` `invalid-authorization-token`';
                readonly enum: readonly ['unauthorized-access', 'invalid-authorization-token'];
                readonly examples: readonly ['unauthorized-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['You are not authorized to access this resource'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Unauthorized Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '503': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Service Unavailable'];
              };
              readonly code: {
                readonly type: 'object';
                readonly description: 'Application-specific error code, expressed as a string value.';
                readonly examples: readonly ['service-unavailable'];
                readonly additionalProperties: true;
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Service Unavailable. Try again later.'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetConnections: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'User identifier.';
          };
        };
        readonly required: readonly ['userId'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly filter: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: "Connections filters, id, status, institution.id. e.g institution.id.eq('AU00000')";
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'ConnectionsGetResponseResource';
      readonly required: readonly ['type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Type, always "list".';
          readonly examples: readonly ['list'];
        };
        readonly data: {
          readonly type: 'array';
          readonly items: {
            readonly required: readonly [
              'createdDate',
              'id',
              'method',
              'institution',
              'links',
              'type'
            ];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type, always "connection".';
                readonly examples: readonly ['connection'];
              };
              readonly id: {
                readonly type: 'string';
                readonly description: 'Connection identification.';
                readonly examples: readonly ['61723'];
              };
              readonly method: {
                readonly type: 'string';
                readonly description: 'method identification.';
                readonly examples: readonly ['openbanking'];
              };
              readonly status: {
                readonly type: 'string';
                readonly description: 'Connection status, available only for SERVER_SCOPE.\n\n`active` `pending` `invalid`';
                readonly enum: readonly ['active', 'pending', 'invalid'];
                readonly examples: readonly ['active'];
              };
              readonly createdDate: {
                readonly type: 'string';
                readonly description: 'Created date of the connection, available only for SERVER_SCOPE.';
                readonly examples: readonly ['2019-07-29T07:34:09Z'];
              };
              readonly lastUsed: {
                readonly type: 'string';
                readonly description: 'Connection last used date, available only for SERVER_SCOPE.';
                readonly examples: readonly ['2020-06-22T11:15:09Z'];
              };
              readonly institution: {
                readonly title: 'ConnectionInstitution';
                readonly required: readonly ['id', 'links', 'type'];
                readonly type: 'object';
                readonly properties: {
                  readonly id: {
                    readonly type: 'string';
                    readonly description: 'Institution id';
                    readonly examples: readonly ['AU00000'];
                  };
                  readonly links: {
                    readonly title: 'ResourceLink';
                    readonly required: readonly ['self'];
                    readonly type: 'object';
                    readonly properties: {
                      readonly self: {
                        readonly type: 'string';
                        readonly description: 'URL of the resource.';
                        readonly examples: readonly [
                          'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
                        ];
                      };
                    };
                    readonly description: 'Link object containing a link to the resource, self reference.';
                  };
                  readonly type: {
                    readonly type: 'string';
                    readonly description: 'Always "institution".';
                    readonly examples: readonly ['institution'];
                  };
                };
                readonly description: 'Institution details.';
              };
              readonly links: {
                readonly title: 'GetConnectionsLinks';
                readonly required: readonly ['institution', 'self'];
                readonly type: 'object';
                readonly properties: {
                  readonly accounts: {
                    readonly type: 'string';
                    readonly description: 'Accounts reference url.';
                    readonly examples: readonly [
                      "https://au-api.basiq.io/users/cd6fbd92/accounts?filter=institution.id.eq('AU00000')"
                    ];
                  };
                  readonly institution: {
                    readonly type: 'string';
                    readonly description: 'Institution details.';
                    readonly examples: readonly ['https://au-api.basiq.io/institutions/AU00000'];
                  };
                  readonly self: {
                    readonly type: 'string';
                    readonly description: 'Connection self reference url.';
                    readonly examples: readonly [
                      'https://au-api.basiq.io/users/cd6fbd92/connections/29523951'
                    ];
                  };
                  readonly transactions: {
                    readonly type: 'string';
                    readonly description: 'Transactions reference url.';
                    readonly examples: readonly [
                      "https://au-api.basiq.io/users/cd6fbd92/transactions?filter=institution.id.eq('AU00000')"
                    ];
                  };
                };
                readonly description: 'Object containing links to resources.';
              };
            };
          };
        };
        readonly links: {
          readonly title: 'ResourceLink';
          readonly required: readonly ['self'];
          readonly type: 'object';
          readonly properties: {
            readonly self: {
              readonly type: 'string';
              readonly description: 'URL of the resource.';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
              ];
            };
          };
          readonly description: 'Link object containing a link to the resource, self reference.';
        };
      };
      readonly description: 'Object containing details for connections.';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '503': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Service Unavailable'];
              };
              readonly code: {
                readonly type: 'object';
                readonly description: 'Application-specific error code, expressed as a string value.';
                readonly examples: readonly ['service-unavailable'];
                readonly additionalProperties: true;
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Service Unavailable. Try again later.'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetConnector: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly connectorId: {
            readonly pattern: '^[A-Z]{2}[0-9]{5}$';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'Connector ID';
          };
          readonly method: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'Connector method';
          };
        };
        readonly required: readonly ['connectorId', 'method'];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly required: readonly [
        'authorization',
        'id',
        'institution',
        'method',
        'scopes',
        'stage',
        'stats',
        'status',
        'type'
      ];
      readonly type: 'object';
      readonly properties: {
        readonly authorization: {
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly meta: {
              readonly type: 'object';
              readonly properties: {
                readonly forgotten_password_url: {
                  readonly type: 'string';
                  readonly description: 'URL to institution forgotten password page';
                  readonly 'x-go-name': 'ForgottenPasswordUrl';
                  readonly examples: readonly ['https://example.com/forgotten-password'];
                };
                readonly login_id_caption: {
                  readonly type: 'string';
                  readonly description: 'Login ID field caption that should be shown on UI';
                  readonly 'x-go-name': 'LoginIdCaption';
                  readonly examples: readonly ['User name'];
                };
                readonly password_caption: {
                  readonly type: 'string';
                  readonly description: 'Password field caption that should be shown on UI';
                  readonly 'x-go-name': 'PasswordCaption';
                  readonly examples: readonly ['Password'];
                };
                readonly secondary_login_id_caption: {
                  readonly type: 'string';
                  readonly description: 'Secondary loginID caption that should be shown on UI';
                  readonly 'x-go-name': 'SecondaryLoginIdCaption';
                  readonly examples: readonly ['Secondary login id'];
                };
                readonly security_code_caption: {
                  readonly type: 'string';
                  readonly description: 'Security code caption that should be shown on UI';
                  readonly 'x-go-name': 'SecurityCodeCaption';
                  readonly examples: readonly ['Security code'];
                };
              };
            };
            readonly type: {
              readonly type: 'string';
              readonly description: 'Authorization type identifier\nuser AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier\n\n`user` `token` `other` `user-mfa` `user-mfa-intermittent`';
              readonly enum: readonly [
                'user',
                'token',
                'other',
                'user-mfa',
                'user-mfa-intermittent'
              ];
              readonly 'x-go-enum-desc': 'user AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier';
              readonly 'x-go-name': 'Type';
              readonly examples: readonly ['user'];
            };
          };
        };
        readonly id: {
          readonly maxLength: 7;
          readonly minLength: 7;
          readonly pattern: '^[A-Z]{2}[0-9]{5}$';
          readonly type: 'string';
          readonly description: 'Institution ID';
          readonly examples: readonly ['AU00000'];
        };
        readonly institution: {
          readonly required: readonly ['country', 'logo', 'name', 'shortName', 'tier', 'type'];
          readonly type: 'object';
          readonly properties: {
            readonly country: {
              readonly type: 'string';
              readonly description: 'Institution country name';
              readonly 'x-go-name': 'Country';
              readonly examples: readonly ['Australia'];
            };
            readonly logo: {
              readonly required: readonly ['links', 'type'];
              readonly type: 'object';
              readonly properties: {
                readonly colors: {
                  readonly type: 'object';
                  readonly properties: {
                    readonly primary: {
                      readonly type: 'string';
                      readonly description: 'Primary primary institution color';
                      readonly 'x-go-name': 'Primary';
                    };
                  };
                  readonly description: 'Colors contains institution colors type';
                };
                readonly links: {
                  readonly required: readonly ['full', 'square'];
                  readonly type: 'object';
                  readonly properties: {
                    readonly full: {
                      readonly type: 'string';
                      readonly description: 'URL to full size logo';
                      readonly 'x-go-name': 'Full';
                      readonly examples: readonly ['https://example.com/AU00000-full.svg'];
                    };
                    readonly square: {
                      readonly type: 'string';
                      readonly description: 'Square formatted logo URL';
                      readonly 'x-go-name': 'Square';
                      readonly examples: readonly ['https://example.com/AU00000.svg'];
                    };
                  };
                  readonly description: 'LogoResourceLinks contains institution logo resource links';
                };
                readonly type: {
                  readonly type: 'string';
                  readonly description: 'Resource type identifier.\nimage ImageResourceType\n\n`image`';
                  readonly enum: readonly ['image'];
                  readonly 'x-go-enum-desc': 'image ImageResourceType';
                  readonly 'x-go-name': 'Type';
                  readonly examples: readonly ['image'];
                };
              };
              readonly description: 'InstitutionLogoResource linstitution logo resource type';
            };
            readonly name: {
              readonly type: 'string';
              readonly description: 'Institution name';
              readonly 'x-go-name': 'Name';
              readonly examples: readonly ['Hooli Bank'];
            };
            readonly shortName: {
              readonly type: 'string';
              readonly description: 'Institution short name';
              readonly 'x-go-name': 'ShortName';
              readonly examples: readonly ['Hooli'];
            };
            readonly tier: {
              readonly type: 'string';
              readonly description: 'Institution tier identifier\n1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution\n\n`1` `2` `3` `4`';
              readonly enum: readonly ['1', '2', '3', '4'];
              readonly 'x-go-enum-desc': '1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution';
              readonly 'x-go-name': 'Tier';
              readonly examples: readonly ['1'];
            };
            readonly type: {
              readonly type: 'string';
              readonly description: 'Institution type identifier\nBank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions\n\n`Bank` `Bank (Foreign)` `Test Bank` `Credit Union` `Financial Services` `Superannuation` `Building Society` `Government`';
              readonly enum: readonly [
                'Bank',
                'Bank (Foreign)',
                'Test Bank',
                'Credit Union',
                'Financial Services',
                'Superannuation',
                'Building Society',
                'Government'
              ];
              readonly 'x-go-enum-desc': 'Bank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions';
              readonly 'x-go-name': 'Type';
              readonly examples: readonly ['Bank'];
            };
          };
          readonly description: 'ConnectorInstitutionResource connector Institution  resource type';
        };
        readonly links: {
          readonly required: readonly ['self'];
          readonly type: 'object';
          readonly properties: {
            readonly self: {
              readonly type: 'string';
              readonly description: 'URL to resource itself';
              readonly 'x-go-name': 'Self';
            };
          };
          readonly description: 'ResourceLinks contains resource links';
        };
        readonly method: {
          readonly type: 'string';
          readonly description: 'Current Connector method';
          readonly examples: readonly ['web'];
        };
        readonly scopes: {
          readonly type: 'array';
          readonly description: 'Connector scopes array';
          readonly items: {
            readonly type: 'string';
          };
        };
        readonly stage: {
          readonly type: 'string';
          readonly description: 'Current Connector stage';
          readonly examples: readonly ['beta'];
        };
        readonly stats: {
          readonly type: 'object';
          readonly properties: {
            readonly averageDurationMs: {
              readonly type: 'object';
              readonly properties: {
                readonly retrieveAccounts: {
                  readonly type: 'integer';
                  readonly description: 'Connector average duration in milliseconds of <b>fetch accounts</b> step for institution';
                  readonly format: 'int64';
                  readonly 'x-go-name': 'RetrieveAccounts';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
                readonly retrieveMeta: {
                  readonly type: 'integer';
                  readonly description: 'Connector average duration in milliseconds of <b>fetch metadata</b> step for institution';
                  readonly format: 'int64';
                  readonly 'x-go-name': 'RetrieveMeta';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
                readonly retrieveTransactions: {
                  readonly type: 'integer';
                  readonly description: 'Connector average duration in milliseconds of <b>fetch transactions</b> step for institution';
                  readonly format: 'int64';
                  readonly 'x-go-name': 'RetrieveTransactions';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
                readonly total: {
                  readonly type: 'integer';
                  readonly description: 'Total connector average duration in milliseconds';
                  readonly format: 'int64';
                  readonly 'x-go-name': 'Total';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
                readonly verifyCredentials: {
                  readonly type: 'integer';
                  readonly description: 'Connector average duration in milliseconds of <b>verifiy credentials</b> step for institution';
                  readonly format: 'int64';
                  readonly 'x-go-name': 'VerifyCredentials';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
              };
              readonly description: 'AverageDurationMs average connector duration in milliseconds per segments.\nWhen durations are not known for institution this field will be `null`.';
              readonly 'x-go-name': 'AverageDurationMs';
            };
          };
          readonly description: 'InstitutionPerformanceStats response type for institution performance stats';
        };
        readonly status: {
          readonly type: 'string';
          readonly description: 'FeatureCondition type that describes an feature status for institution';
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Resource type identifier. It is always "connector" for this model.\nconnector ConnectorEntityType\n\n`connector`';
          readonly enum: readonly ['connector'];
          readonly examples: readonly ['connector'];
        };
      };
      readonly description: 'Connector contains connector data.';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`unauthorized-access` `invalid-authorization-token`';
                readonly enum: readonly ['unauthorized-access', 'invalid-authorization-token'];
                readonly examples: readonly ['unauthorized-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['You are not authorized to access this resource'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Unauthorized Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetConnectors: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly filter: {
            readonly type: 'string';
            readonly 'x-go-name': 'Filter';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: "Filter parameter can be used to filter connector list by connector property. This parameter should contain comma separated list of filter statements.</br>\nFilter statement is composed from entity name (in this case it is always `institution`), property name (e.g. `stage`), filter operator (e.g. `eq`) and quoted string value in parentasis (e.g. `('live')`). </br>\nThe Following list of regular expressions descirbes acceptable filter statements: </br>\n• `(connector).(id).(eq)\\(('[A-Z][A-Z][0-9]{5}')\\)` </br>\n• `(connector).(method).(eq)\\(('web'||'open-banking'|'pdf'|'csv')\\)` </br>\n• `(connector).(status).(eq|ne)\\(('operational'|'degraded-performance'|'partial-outage'|'major-outage'|'under-maintenance'|'under-improvement')\\)` </br>\n• `(connector).(status).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(stage).(eq|ne)\\(('live'|'beta'|'alpha')\\)` </br>\n• `(connector).(stage).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(scopes).(in|eq|ne)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(institution).(country).(eq|ne)\\(('Australia'|'New Zealand')\\)` </br>\n• `(connector).(institution).(country).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(institution).(tier).(eq|ne)\\(('1'|'2'|'3'|'4')\\)` </br>\n• `(connector).(institution).(tier).(in)\\(([\\W\\d]+)\\)` </br>\n• `(connector).(institution).(type).(eq|ne)\\(('Bank'|'Bank \\(Foreign\\)'|'Test Bank'|'Credit Union'|'Financial Services'|'Superannuation')\\)` </br>\n• `(connector).(authorization).(type).(eq|ne)\\(('user'|'user-mfa'|'user-mfa-intermittent'|'other'|'token')\\)` </br>\n• `(connector).(authorization).(type).(in)\\(([\\w\\W]+)\\)` </br>\n• `(connector).(connectorCategory).(eq|ne)\\(('chrome'|'node')\\)` </br>\nMultiple filter definitions should be separated with comma (`,`). </br>\nFor example, this is filter statement will keep only live tier 1 and tier 2 institutions: `filter=connector.stage.eq('live'),connector.institution.tier.in('1','2')` </br>";
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly required: readonly ['data', 'links', 'totalCount', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly data: {
          readonly type: 'array';
          readonly description: 'Data contains list of connectors';
          readonly items: {
            readonly required: readonly [
              'authorization',
              'id',
              'institution',
              'method',
              'scopes',
              'stage',
              'stats',
              'status',
              'type'
            ];
            readonly type: 'object';
            readonly properties: {
              readonly authorization: {
                readonly required: readonly ['type'];
                readonly type: 'object';
                readonly properties: {
                  readonly meta: {
                    readonly type: 'object';
                    readonly properties: {
                      readonly forgotten_password_url: {
                        readonly type: 'string';
                        readonly description: 'URL to institution forgotten password page';
                        readonly 'x-go-name': 'ForgottenPasswordUrl';
                        readonly examples: readonly ['https://example.com/forgotten-password'];
                      };
                      readonly login_id_caption: {
                        readonly type: 'string';
                        readonly description: 'Login ID field caption that should be shown on UI';
                        readonly 'x-go-name': 'LoginIdCaption';
                        readonly examples: readonly ['User name'];
                      };
                      readonly password_caption: {
                        readonly type: 'string';
                        readonly description: 'Password field caption that should be shown on UI';
                        readonly 'x-go-name': 'PasswordCaption';
                        readonly examples: readonly ['Password'];
                      };
                      readonly secondary_login_id_caption: {
                        readonly type: 'string';
                        readonly description: 'Secondary loginID caption that should be shown on UI';
                        readonly 'x-go-name': 'SecondaryLoginIdCaption';
                        readonly examples: readonly ['Secondary login id'];
                      };
                      readonly security_code_caption: {
                        readonly type: 'string';
                        readonly description: 'Security code caption that should be shown on UI';
                        readonly 'x-go-name': 'SecurityCodeCaption';
                        readonly examples: readonly ['Security code'];
                      };
                    };
                  };
                  readonly type: {
                    readonly type: 'string';
                    readonly description: 'Authorization type identifier\nuser AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier\n\n`user` `token` `other` `user-mfa` `user-mfa-intermittent`';
                    readonly enum: readonly [
                      'user',
                      'token',
                      'other',
                      'user-mfa',
                      'user-mfa-intermittent'
                    ];
                    readonly 'x-go-enum-desc': 'user AuthorizationUser  AuthorizationUser "User" authorization type identifier\ntoken AuthorizationToken AuthorizationToken "Token" authorization type identifier\nother AuthorizationOther  AuthorizationOther "Other" authorization type identifier\nuser-mfa AuthorizationUserMfa  AuthorizationUserMfa "UserMfa" authorization type identifier\nuser-mfa-intermittent AuthorizationUserMfaIntermittent  AuthorizationUserMfaIntermittent "UserMfaIntermittent" authorization type identifier';
                    readonly 'x-go-name': 'Type';
                    readonly examples: readonly ['user'];
                  };
                };
              };
              readonly id: {
                readonly maxLength: 7;
                readonly minLength: 7;
                readonly pattern: '^[A-Z]{2}[0-9]{5}$';
                readonly type: 'string';
                readonly description: 'Institution ID';
                readonly examples: readonly ['AU00000'];
              };
              readonly institution: {
                readonly required: readonly [
                  'country',
                  'logo',
                  'name',
                  'shortName',
                  'tier',
                  'type'
                ];
                readonly type: 'object';
                readonly properties: {
                  readonly country: {
                    readonly type: 'string';
                    readonly description: 'Institution country name';
                    readonly 'x-go-name': 'Country';
                    readonly examples: readonly ['Australia'];
                  };
                  readonly logo: {
                    readonly required: readonly ['links', 'type'];
                    readonly type: 'object';
                    readonly properties: {
                      readonly colors: {
                        readonly type: 'object';
                        readonly properties: {
                          readonly primary: {
                            readonly type: 'string';
                            readonly description: 'Primary primary institution color';
                            readonly 'x-go-name': 'Primary';
                          };
                        };
                        readonly description: 'Colors contains institution colors type';
                      };
                      readonly links: {
                        readonly required: readonly ['full', 'square'];
                        readonly type: 'object';
                        readonly properties: {
                          readonly full: {
                            readonly type: 'string';
                            readonly description: 'URL to full size logo';
                            readonly 'x-go-name': 'Full';
                            readonly examples: readonly ['https://example.com/AU00000-full.svg'];
                          };
                          readonly square: {
                            readonly type: 'string';
                            readonly description: 'Square formatted logo URL';
                            readonly 'x-go-name': 'Square';
                            readonly examples: readonly ['https://example.com/AU00000.svg'];
                          };
                        };
                        readonly description: 'LogoResourceLinks contains institution logo resource links';
                      };
                      readonly type: {
                        readonly type: 'string';
                        readonly description: 'Resource type identifier.\nimage ImageResourceType\n\n`image`';
                        readonly enum: readonly ['image'];
                        readonly 'x-go-enum-desc': 'image ImageResourceType';
                        readonly 'x-go-name': 'Type';
                        readonly examples: readonly ['image'];
                      };
                    };
                    readonly description: 'InstitutionLogoResource linstitution logo resource type';
                  };
                  readonly name: {
                    readonly type: 'string';
                    readonly description: 'Institution name';
                    readonly 'x-go-name': 'Name';
                    readonly examples: readonly ['Hooli Bank'];
                  };
                  readonly shortName: {
                    readonly type: 'string';
                    readonly description: 'Institution short name';
                    readonly 'x-go-name': 'ShortName';
                    readonly examples: readonly ['Hooli'];
                  };
                  readonly tier: {
                    readonly type: 'string';
                    readonly description: 'Institution tier identifier\n1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution\n\n`1` `2` `3` `4`';
                    readonly enum: readonly ['1', '2', '3', '4'];
                    readonly 'x-go-enum-desc': '1 TierOne  TierOne tier identifier for tier1 institution\n2 TierTwo  TierTwo tier identifier for tier2 institution\n3 TierThree  TierThree tier identifier for tier3 institution\n4 TierFour  TierFour tier identifier for tier4 institution';
                    readonly 'x-go-name': 'Tier';
                    readonly examples: readonly ['1'];
                  };
                  readonly type: {
                    readonly type: 'string';
                    readonly description: 'Institution type identifier\nBank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions\n\n`Bank` `Bank (Foreign)` `Test Bank` `Credit Union` `Financial Services` `Superannuation` `Building Society` `Government`';
                    readonly enum: readonly [
                      'Bank',
                      'Bank (Foreign)',
                      'Test Bank',
                      'Credit Union',
                      'Financial Services',
                      'Superannuation',
                      'Building Society',
                      'Government'
                    ];
                    readonly 'x-go-enum-desc': 'Bank BankInstitutionType  BankInstitutionType institution type identifier for Banks\nBank (Foreign) BankForeignInstitutionType  BankForeignInstitutionType institution type identifier for Foreign banks\nTest Bank TestBankInstitutionType  TestBankInstitutionType institution type identifier for Test banks\nCredit Union CreditUnionInstitutionType  CreditUnionInstitutionType institution type identifier for Credit union institutions\nFinancial Services FinancialServicesInstitutionType  FinancialServicesInstitutionType institution type identifier for Financial service institutions\nSuperannuation SuperannuationInstitutionType  SuperannuationInstitutionType institution type identifier for Superannuation institutions\nBuilding Society BuildingSociety  BuildingSociety institution type identifier for Building Society institutions\nGovernment Government  Government institution type identifier for Government institutions';
                    readonly 'x-go-name': 'Type';
                    readonly examples: readonly ['Bank'];
                  };
                };
                readonly description: 'ConnectorInstitutionResource connector Institution  resource type';
              };
              readonly links: {
                readonly required: readonly ['self'];
                readonly type: 'object';
                readonly properties: {
                  readonly self: {
                    readonly type: 'string';
                    readonly description: 'URL to resource itself';
                    readonly 'x-go-name': 'Self';
                  };
                };
                readonly description: 'ResourceLinks contains resource links';
              };
              readonly method: {
                readonly type: 'string';
                readonly description: 'Current Connector method';
                readonly examples: readonly ['web'];
              };
              readonly scopes: {
                readonly type: 'array';
                readonly description: 'Connector scopes array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly stage: {
                readonly type: 'string';
                readonly description: 'Current Connector stage';
                readonly examples: readonly ['beta'];
              };
              readonly stats: {
                readonly type: 'object';
                readonly properties: {
                  readonly averageDurationMs: {
                    readonly type: 'object';
                    readonly properties: {
                      readonly retrieveAccounts: {
                        readonly type: 'integer';
                        readonly description: 'Connector average duration in milliseconds of <b>fetch accounts</b> step for institution';
                        readonly format: 'int64';
                        readonly 'x-go-name': 'RetrieveAccounts';
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                      };
                      readonly retrieveMeta: {
                        readonly type: 'integer';
                        readonly description: 'Connector average duration in milliseconds of <b>fetch metadata</b> step for institution';
                        readonly format: 'int64';
                        readonly 'x-go-name': 'RetrieveMeta';
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                      };
                      readonly retrieveTransactions: {
                        readonly type: 'integer';
                        readonly description: 'Connector average duration in milliseconds of <b>fetch transactions</b> step for institution';
                        readonly format: 'int64';
                        readonly 'x-go-name': 'RetrieveTransactions';
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                      };
                      readonly total: {
                        readonly type: 'integer';
                        readonly description: 'Total connector average duration in milliseconds';
                        readonly format: 'int64';
                        readonly 'x-go-name': 'Total';
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                      };
                      readonly verifyCredentials: {
                        readonly type: 'integer';
                        readonly description: 'Connector average duration in milliseconds of <b>verifiy credentials</b> step for institution';
                        readonly format: 'int64';
                        readonly 'x-go-name': 'VerifyCredentials';
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                      };
                    };
                    readonly description: 'AverageDurationMs average connector duration in milliseconds per segments.\nWhen durations are not known for institution this field will be `null`.';
                    readonly 'x-go-name': 'AverageDurationMs';
                  };
                };
                readonly description: 'InstitutionPerformanceStats response type for institution performance stats';
              };
              readonly status: {
                readonly type: 'string';
                readonly description: 'FeatureCondition type that describes an feature status for institution';
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Resource type identifier. It is always "connector" for this model.\nconnector ConnectorEntityType\n\n`connector`';
                readonly enum: readonly ['connector'];
                readonly examples: readonly ['connector'];
              };
            };
            readonly description: 'Connector contains connector data.';
          };
          readonly 'x-go-name': 'Connectors';
        };
        readonly links: {
          readonly required: readonly ['self'];
          readonly type: 'object';
          readonly properties: {
            readonly self: {
              readonly type: 'string';
              readonly description: 'URL to resource itself';
              readonly 'x-go-name': 'Self';
            };
          };
          readonly description: 'ResourceLinks contains resource links';
        };
        readonly totalCount: {
          readonly type: 'integer';
          readonly description: 'TotalCount contains total count of connectors';
          readonly format: 'int64';
          readonly 'x-go-name': 'TotalCount';
          readonly examples: readonly [1];
          readonly minimum: -9223372036854776000;
          readonly maximum: 9223372036854776000;
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'ResponseFormat identifies response data format';
        };
      };
      readonly description: 'ConnectorsList contains list of connectors data.';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`unauthorized-access` `invalid-authorization-token`';
                readonly enum: readonly ['unauthorized-access', 'invalid-authorization-token'];
                readonly examples: readonly ['unauthorized-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['You are not authorized to access this resource'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Unauthorized Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetTransaction: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the user.';
          };
          readonly transactionId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the transaction.';
          };
        };
        readonly required: readonly ['userId', 'transactionId'];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly required: readonly [
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
        'type'
      ];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Value is "transaction".';
          readonly examples: readonly ['transaction'];
        };
        readonly id: {
          readonly type: 'string';
          readonly description: "Uniquely identifies the transaction for this connection. Note that when a connection is refreshed pending transactions will receive new id's, whilst posted transactions will receive the same id's as before the refresh.";
          readonly examples: readonly ['d3de1ca1'];
        };
        readonly account: {
          readonly type: 'string';
          readonly description: 'The id of the account resource the transaction belongs to.';
          readonly examples: readonly ['d3de1ca1'];
        };
        readonly amount: {
          readonly type: 'string';
          readonly description: 'Transaction amount. Outgoing funds are expressed as negative values.';
          readonly examples: readonly ['123.12'];
        };
        readonly balance: {
          readonly type: 'string';
          readonly description: 'Value of the account balance at time the transaction was completed.';
          readonly examples: readonly ['123.12'];
        };
        readonly class: {
          readonly type: 'string';
          readonly description: 'Describes the class(type) of transaction.\n\n`bank-fee` `payment` `cash-withdrawal` `transfer` `loan-interest` `refund` `direct-credit` `interest` `loan-repayment`';
          readonly enum: readonly [
            'bank-fee',
            'payment',
            'cash-withdrawal',
            'transfer',
            'loan-interest',
            'refund',
            'direct-credit',
            'interest',
            'loan-repayment'
          ];
          readonly examples: readonly ['payment'];
        };
        readonly connection: {
          readonly type: 'string';
          readonly description: 'The id of the connection resource that was used to retrieve the transaction.';
          readonly examples: readonly ['d3de1ca1'];
        };
        readonly description: {
          readonly type: 'string';
          readonly description: 'The transaction description as submitted by the institution..';
        };
        readonly direction: {
          readonly type: 'string';
          readonly description: 'Identifies if the transaction is of debit or credit type.\n\n`debit` `credit`';
          readonly enum: readonly ['debit', 'credit'];
          readonly examples: readonly ['debit'];
        };
        readonly enrich: {
          readonly required: readonly ['category', 'location', 'merchant'];
          readonly type: 'object';
          readonly properties: {
            readonly category: {
              readonly type: 'object';
              readonly properties: {
                readonly anzsic: {
                  readonly type: 'object';
                  readonly properties: {
                    readonly class: {
                      readonly type: 'object';
                      readonly properties: {
                        readonly title: {
                          readonly type: 'string';
                          readonly description: 'Class Details';
                          readonly examples: readonly ['Cafes and Restaurants'];
                        };
                        readonly code: {
                          readonly type: 'string';
                          readonly description: 'Class Code';
                          readonly examples: readonly ['4511'];
                        };
                      };
                    };
                    readonly division: {
                      readonly type: 'object';
                      readonly properties: {
                        readonly title: {
                          readonly type: 'string';
                          readonly description: 'Division Details';
                          readonly examples: readonly ['Accommodation and  Food Services'];
                        };
                        readonly code: {
                          readonly type: 'string';
                          readonly description: 'Division Code';
                          readonly examples: readonly ['H'];
                        };
                      };
                    };
                    readonly group: {
                      readonly type: 'object';
                      readonly properties: {
                        readonly code: {
                          readonly type: 'string';
                          readonly description: 'Group Code';
                          readonly examples: readonly ['451'];
                        };
                        readonly title: {
                          readonly type: 'string';
                          readonly description: 'Group Details';
                          readonly examples: readonly [
                            'Cafes, Restaurants and Takeaway Food Services'
                          ];
                        };
                      };
                    };
                    readonly subdivision: {
                      readonly type: 'object';
                      readonly properties: {
                        readonly code: {
                          readonly type: 'string';
                          readonly description: 'Subdivision Code';
                          readonly examples: readonly ['45'];
                        };
                        readonly title: {
                          readonly type: 'string';
                          readonly description: 'Subdivision Details';
                          readonly examples: readonly ['Food and Beverage Services'];
                        };
                      };
                    };
                  };
                };
              };
            };
            readonly location: {
              readonly type: 'object';
              readonly properties: {
                readonly country: {
                  readonly type: 'string';
                  readonly description: 'Country';
                  readonly examples: readonly ['Australia'];
                };
                readonly formattedAddress: {
                  readonly type: 'string';
                  readonly description: 'Address';
                  readonly examples: readonly ['1/39 E Esplanade, Manly NSW 2095'];
                };
                readonly geometry: {
                  readonly type: 'object';
                  readonly properties: {
                    readonly lat: {
                      readonly type: 'string';
                      readonly description: 'Latitude';
                      readonly examples: readonly ['-33.79988520000001'];
                    };
                    readonly lng: {
                      readonly type: 'string';
                      readonly description: 'Longitude';
                      readonly examples: readonly ['151.2858021'];
                    };
                  };
                };
                readonly postalCode: {
                  readonly type: 'string';
                  readonly description: 'Postal Code';
                  readonly examples: readonly ['2095'];
                };
                readonly route: {
                  readonly type: 'string';
                  readonly description: 'Route Name';
                  readonly examples: readonly ['E Esplanade'];
                };
                readonly routeNo: {
                  readonly type: 'string';
                  readonly description: 'Route Number';
                  readonly examples: readonly ['29'];
                };
                readonly state: {
                  readonly type: 'string';
                  readonly description: 'State';
                  readonly examples: readonly ['NSW'];
                };
                readonly suburb: {
                  readonly type: 'string';
                  readonly description: 'Suburb';
                  readonly examples: readonly ['Manly'];
                };
              };
            };
            readonly merchant: {
              readonly required: readonly [
                'id',
                'businessName',
                'ABN',
                'website',
                'logoMaster',
                'logoThumb'
              ];
              readonly type: 'object';
              readonly properties: {
                readonly id: {
                  readonly type: 'string';
                  readonly description: 'id';
                  readonly examples: readonly ['ae4a051c-4791-11e8-8750-0a87c0279fe8'];
                };
                readonly businessName: {
                  readonly type: 'string';
                  readonly description: 'Merchant name';
                  readonly examples: readonly ['Garfish Manly'];
                };
                readonly ABN: {
                  readonly type: 'string';
                  readonly description: 'ABN';
                  readonly examples: readonly [90065628864];
                };
                readonly logoMaster: {
                  readonly type: 'string';
                  readonly description: 'full merchant logo';
                  readonly examples: readonly [
                    'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-master.png'
                  ];
                };
                readonly logoThumb: {
                  readonly type: 'string';
                  readonly description: 'thumbnail merchant logo';
                  readonly examples: readonly [
                    'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-thumb.png'
                  ];
                };
                readonly phoneNumber: {
                  readonly type: 'object';
                  readonly properties: {
                    readonly international: {
                      readonly type: 'string';
                      readonly description: 'International Phone Number';
                      readonly examples: readonly ['+61 2 9977 0707'];
                    };
                    readonly local: {
                      readonly type: 'string';
                      readonly description: 'Local Phone Number';
                      readonly examples: readonly ['(02) 9977 0707'];
                    };
                  };
                };
                readonly website: {
                  readonly type: 'string';
                  readonly description: 'Merchant Website';
                  readonly examples: readonly ['http://garfish.com.au/garfish-manly/'];
                };
              };
            };
          };
        };
        readonly institution: {
          readonly type: 'string';
          readonly description: 'The id of the institution resource the transaction originated from.';
          readonly examples: readonly ['AU00000'];
        };
        readonly postDate: {
          readonly type: 'string';
          readonly description: 'Date the transaction was posted as provided by the institution (this is the same date that appears on a bank statement). This value is null if the record is pending. e.g. "2017-11-10T21:46:44Z" or 2017-11-10T00:00:00Z.';
          readonly examples: readonly ['2018-11-02T00:00:00Z'];
        };
        readonly status: {
          readonly type: 'string';
          readonly description: 'Identifies if a transaction is pending or posted. A pending transaction is an approved debit or credit transaction that has not been fully processed yet (i.e. has not been posted). Find out more about pending transaction and how to deal with them within your app. Note that pending transactions are not available for all institutions.\n\n`pending` `posted`';
          readonly enum: readonly ['pending', 'posted'];
          readonly examples: readonly ['pending'];
        };
        readonly transactionDate: {
          readonly type: 'string';
          readonly description: 'Date that the user executed the transaction as provided by the istitution. Note that not all transactions provide this value (varies by institution) e.g. "2017-11-10T00:00:00Z"';
          readonly examples: readonly ['2018-11-02T00:00:00.000Z'];
        };
        readonly links: {
          readonly required: readonly ['account', 'connection', 'institution', 'self'];
          readonly type: 'object';
          readonly properties: {
            readonly account: {
              readonly type: 'string';
              readonly description: 'Url of the account.';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/6a52015e/accounts/31eb30a0'
              ];
            };
            readonly institution: {
              readonly type: 'string';
              readonly description: 'Url of the institution.';
              readonly examples: readonly ['https://au-api.basiq.io/institutions/AU00000'];
            };
            readonly self: {
              readonly type: 'string';
              readonly description: 'Transaction self reference.';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/6a52015e/transactions/2082c765'
              ];
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '503': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Service Unavailable'];
              };
              readonly code: {
                readonly type: 'object';
                readonly description: 'Application-specific error code, expressed as a string value.';
                readonly examples: readonly ['service-unavailable'];
                readonly additionalProperties: true;
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Service Unavailable. Try again later.'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetTransactions: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'User identifier.';
          };
        };
        readonly required: readonly ['userId'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly limit: {
            readonly type: 'integer';
            readonly format: 'int64';
            readonly default: 500;
            readonly minimum: -9223372036854776000;
            readonly maximum: 9223372036854776000;
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'This represents the maximum number of items that may be included in the response (maximum of 500). Note that by default 500 items are returned if this value is not specified.';
          };
          readonly filter: {
            readonly type: 'string';
            readonly enum: readonly [
              'account.id',
              'transaction.postDate',
              'transaction.status',
              'institution.id',
              'transaction.direction',
              'transaction.class'
            ];
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'Transaction filters.';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'Transactions container object.';
      readonly required: readonly ['count', 'data', 'size', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Value is "list".';
          readonly examples: readonly ['list'];
        };
        readonly count: {
          readonly type: 'integer';
          readonly description: 'Count of the transactions in the response.';
          readonly format: 'int64';
          readonly examples: readonly [100];
          readonly minimum: -9223372036854776000;
          readonly maximum: 9223372036854776000;
        };
        readonly size: {
          readonly type: 'integer';
          readonly format: 'int64';
          readonly examples: readonly [500];
          readonly minimum: -9223372036854776000;
          readonly maximum: 9223372036854776000;
        };
        readonly data: {
          readonly type: 'array';
          readonly items: {
            readonly required: readonly [
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
              'type'
            ];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Value is "transaction".';
                readonly examples: readonly ['transaction'];
              };
              readonly id: {
                readonly type: 'string';
                readonly description: "Uniquely identifies the transaction for this connection. Note that when a connection is refreshed pending transactions will receive new id's, whilst posted transactions will receive the same id's as before the refresh.";
                readonly examples: readonly ['d3de1ca1'];
              };
              readonly account: {
                readonly type: 'string';
                readonly description: 'The id of the account resource the transaction belongs to.';
                readonly examples: readonly ['d3de1ca1'];
              };
              readonly amount: {
                readonly type: 'string';
                readonly description: 'Transaction amount. Outgoing funds are expressed as negative values.';
                readonly examples: readonly ['123.12'];
              };
              readonly balance: {
                readonly type: 'string';
                readonly description: 'Value of the account balance at time the transaction was completed.';
                readonly examples: readonly ['123.12'];
              };
              readonly class: {
                readonly type: 'string';
                readonly description: 'Describes the class(type) of transaction.\n\n`bank-fee` `payment` `cash-withdrawal` `transfer` `loan-interest` `refund` `direct-credit` `interest` `loan-repayment`';
                readonly enum: readonly [
                  'bank-fee',
                  'payment',
                  'cash-withdrawal',
                  'transfer',
                  'loan-interest',
                  'refund',
                  'direct-credit',
                  'interest',
                  'loan-repayment'
                ];
                readonly examples: readonly ['payment'];
              };
              readonly connection: {
                readonly type: 'string';
                readonly description: 'The id of the connection resource that was used to retrieve the transaction.';
                readonly examples: readonly ['d3de1ca1'];
              };
              readonly description: {
                readonly type: 'string';
                readonly description: 'The transaction description as submitted by the institution..';
              };
              readonly direction: {
                readonly type: 'string';
                readonly description: 'Identifies if the transaction is of debit or credit type.\n\n`debit` `credit`';
                readonly enum: readonly ['debit', 'credit'];
                readonly examples: readonly ['debit'];
              };
              readonly enrich: {
                readonly required: readonly ['category', 'location', 'merchant'];
                readonly type: 'object';
                readonly properties: {
                  readonly category: {
                    readonly type: 'object';
                    readonly properties: {
                      readonly anzsic: {
                        readonly type: 'object';
                        readonly properties: {
                          readonly class: {
                            readonly type: 'object';
                            readonly properties: {
                              readonly title: {
                                readonly type: 'string';
                                readonly description: 'Class Details';
                                readonly examples: readonly ['Cafes and Restaurants'];
                              };
                              readonly code: {
                                readonly type: 'string';
                                readonly description: 'Class Code';
                                readonly examples: readonly ['4511'];
                              };
                            };
                          };
                          readonly division: {
                            readonly type: 'object';
                            readonly properties: {
                              readonly title: {
                                readonly type: 'string';
                                readonly description: 'Division Details';
                                readonly examples: readonly ['Accommodation and  Food Services'];
                              };
                              readonly code: {
                                readonly type: 'string';
                                readonly description: 'Division Code';
                                readonly examples: readonly ['H'];
                              };
                            };
                          };
                          readonly group: {
                            readonly type: 'object';
                            readonly properties: {
                              readonly code: {
                                readonly type: 'string';
                                readonly description: 'Group Code';
                                readonly examples: readonly ['451'];
                              };
                              readonly title: {
                                readonly type: 'string';
                                readonly description: 'Group Details';
                                readonly examples: readonly [
                                  'Cafes, Restaurants and Takeaway Food Services'
                                ];
                              };
                            };
                          };
                          readonly subdivision: {
                            readonly type: 'object';
                            readonly properties: {
                              readonly code: {
                                readonly type: 'string';
                                readonly description: 'Subdivision Code';
                                readonly examples: readonly ['45'];
                              };
                              readonly title: {
                                readonly type: 'string';
                                readonly description: 'Subdivision Details';
                                readonly examples: readonly ['Food and Beverage Services'];
                              };
                            };
                          };
                        };
                      };
                    };
                  };
                  readonly location: {
                    readonly type: 'object';
                    readonly properties: {
                      readonly country: {
                        readonly type: 'string';
                        readonly description: 'Country';
                        readonly examples: readonly ['Australia'];
                      };
                      readonly formattedAddress: {
                        readonly type: 'string';
                        readonly description: 'Address';
                        readonly examples: readonly ['1/39 E Esplanade, Manly NSW 2095'];
                      };
                      readonly geometry: {
                        readonly type: 'object';
                        readonly properties: {
                          readonly lat: {
                            readonly type: 'string';
                            readonly description: 'Latitude';
                            readonly examples: readonly ['-33.79988520000001'];
                          };
                          readonly lng: {
                            readonly type: 'string';
                            readonly description: 'Longitude';
                            readonly examples: readonly ['151.2858021'];
                          };
                        };
                      };
                      readonly postalCode: {
                        readonly type: 'string';
                        readonly description: 'Postal Code';
                        readonly examples: readonly ['2095'];
                      };
                      readonly route: {
                        readonly type: 'string';
                        readonly description: 'Route Name';
                        readonly examples: readonly ['E Esplanade'];
                      };
                      readonly routeNo: {
                        readonly type: 'string';
                        readonly description: 'Route Number';
                        readonly examples: readonly ['29'];
                      };
                      readonly state: {
                        readonly type: 'string';
                        readonly description: 'State';
                        readonly examples: readonly ['NSW'];
                      };
                      readonly suburb: {
                        readonly type: 'string';
                        readonly description: 'Suburb';
                        readonly examples: readonly ['Manly'];
                      };
                    };
                  };
                  readonly merchant: {
                    readonly required: readonly [
                      'id',
                      'businessName',
                      'ABN',
                      'website',
                      'logoMaster',
                      'logoThumb'
                    ];
                    readonly type: 'object';
                    readonly properties: {
                      readonly id: {
                        readonly type: 'string';
                        readonly description: 'id';
                        readonly examples: readonly ['ae4a051c-4791-11e8-8750-0a87c0279fe8'];
                      };
                      readonly businessName: {
                        readonly type: 'string';
                        readonly description: 'Merchant name';
                        readonly examples: readonly ['Garfish Manly'];
                      };
                      readonly ABN: {
                        readonly type: 'string';
                        readonly description: 'ABN';
                        readonly examples: readonly [90065628864];
                      };
                      readonly logoMaster: {
                        readonly type: 'string';
                        readonly description: 'full merchant logo';
                        readonly examples: readonly [
                          'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-master.png'
                        ];
                      };
                      readonly logoThumb: {
                        readonly type: 'string';
                        readonly description: 'thumbnail merchant logo';
                        readonly examples: readonly [
                          'https://enrich-enrichmerchantslogobucket-x62p53eh5ld9.s3-ap-southeast-2.amazonaws.com/officeworks-thumb.png'
                        ];
                      };
                      readonly phoneNumber: {
                        readonly type: 'object';
                        readonly properties: {
                          readonly international: {
                            readonly type: 'string';
                            readonly description: 'International Phone Number';
                            readonly examples: readonly ['+61 2 9977 0707'];
                          };
                          readonly local: {
                            readonly type: 'string';
                            readonly description: 'Local Phone Number';
                            readonly examples: readonly ['(02) 9977 0707'];
                          };
                        };
                      };
                      readonly website: {
                        readonly type: 'string';
                        readonly description: 'Merchant Website';
                        readonly examples: readonly ['http://garfish.com.au/garfish-manly/'];
                      };
                    };
                  };
                };
              };
              readonly institution: {
                readonly type: 'string';
                readonly description: 'The id of the institution resource the transaction originated from.';
                readonly examples: readonly ['AU00000'];
              };
              readonly postDate: {
                readonly type: 'string';
                readonly description: 'Date the transaction was posted as provided by the institution (this is the same date that appears on a bank statement). This value is null if the record is pending. e.g. "2017-11-10T21:46:44Z" or 2017-11-10T00:00:00Z.';
                readonly examples: readonly ['2018-11-02T00:00:00Z'];
              };
              readonly status: {
                readonly type: 'string';
                readonly description: 'Identifies if a transaction is pending or posted. A pending transaction is an approved debit or credit transaction that has not been fully processed yet (i.e. has not been posted). Find out more about pending transaction and how to deal with them within your app. Note that pending transactions are not available for all institutions.\n\n`pending` `posted`';
                readonly enum: readonly ['pending', 'posted'];
                readonly examples: readonly ['pending'];
              };
              readonly transactionDate: {
                readonly type: 'string';
                readonly description: 'Date that the user executed the transaction as provided by the istitution. Note that not all transactions provide this value (varies by institution) e.g. "2017-11-10T00:00:00Z"';
                readonly examples: readonly ['2018-11-02T00:00:00.000Z'];
              };
              readonly links: {
                readonly required: readonly ['account', 'connection', 'institution', 'self'];
                readonly type: 'object';
                readonly properties: {
                  readonly account: {
                    readonly type: 'string';
                    readonly description: 'Url of the account.';
                    readonly examples: readonly [
                      'https://au-api.basiq.io/users/6a52015e/accounts/31eb30a0'
                    ];
                  };
                  readonly institution: {
                    readonly type: 'string';
                    readonly description: 'Url of the institution.';
                    readonly examples: readonly ['https://au-api.basiq.io/institutions/AU00000'];
                  };
                  readonly self: {
                    readonly type: 'string';
                    readonly description: 'Transaction self reference.';
                    readonly examples: readonly [
                      'https://au-api.basiq.io/users/6a52015e/transactions/2082c765'
                    ];
                  };
                };
              };
            };
          };
        };
        readonly links: {
          readonly required: readonly ['self'];
          readonly type: 'object';
          readonly properties: {
            readonly self: {
              readonly type: 'string';
              readonly description: 'Self reference url.';
              readonly examples: readonly ['https://au-api.basiq.io/users/ea3a81/transactions'];
            };
            readonly next: {
              readonly type: 'string';
              readonly description: 'Url to next result.';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/6a52015e/transactions?next=bf1ec9d4'
              ];
            };
          };
        };
      };
      readonly description: 'A transaction object is created whenever money is debited or credited from a particular account.';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const RefreshConnection: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the user.';
          };
          readonly connectionId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the connection.';
          };
        };
        readonly required: readonly ['userId', 'connectionId'];
      }
    ];
  };
  readonly response: {
    readonly '202': {
      readonly title: 'ConnectionResponseResource';
      readonly required: readonly ['id', 'links', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Type, always "job".';
          readonly examples: readonly ['job'];
        };
        readonly id: {
          readonly type: 'string';
          readonly description: 'Job identification.';
          readonly examples: readonly ['29523951'];
        };
        readonly links: {
          readonly title: 'ResourceLink';
          readonly required: readonly ['self'];
          readonly type: 'object';
          readonly properties: {
            readonly self: {
              readonly type: 'string';
              readonly description: 'URL of the resource.';
              readonly examples: readonly [
                'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
              ];
            };
          };
          readonly description: 'Link object containing a link to the resource, self reference.';
        };
      };
      readonly description: 'Object containing details for connection post.';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '503': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Service Unavailable'];
              };
              readonly code: {
                readonly type: 'object';
                readonly description: 'Application-specific error code, expressed as a string value.';
                readonly examples: readonly ['service-unavailable'];
                readonly additionalProperties: true;
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Service Unavailable. Try again later.'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const RefreshConnections: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly userId: {
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'The identifier of the user.';
          };
        };
        readonly required: readonly ['userId'];
      }
    ];
  };
  readonly response: {
    readonly '202': {
      readonly title: 'ConnectionsRefreshResource';
      readonly required: readonly ['data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Type, always "list".';
          readonly examples: readonly ['list'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Job details data.';
          readonly items: {
            readonly title: 'ConnectionResponseResource';
            readonly required: readonly ['id', 'links', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type, always "job".';
                readonly examples: readonly ['job'];
              };
              readonly id: {
                readonly type: 'string';
                readonly description: 'Job identification.';
                readonly examples: readonly ['29523951'];
              };
              readonly links: {
                readonly title: 'ResourceLink';
                readonly required: readonly ['self'];
                readonly type: 'object';
                readonly properties: {
                  readonly self: {
                    readonly type: 'string';
                    readonly description: 'URL of the resource.';
                    readonly examples: readonly [
                      'https://au-api.basiq.io/users/cd6fbd92/accounts/319ae910'
                    ];
                  };
                };
                readonly description: 'Link object containing a link to the resource, self reference.';
              };
            };
            readonly description: 'Object containing details for connection post.';
          };
        };
      };
      readonly description: 'Object containing details for connections refresh.';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`parameter-not-supplied` `parameter-not-valid` `unsupported-accept` `invalid-content` `institution-not-supported` `invalid-credentials`';
                readonly enum: readonly [
                  'parameter-not-supplied',
                  'parameter-not-valid',
                  'unsupported-accept',
                  'invalid-content',
                  'institution-not-supported',
                  'invalid-credentials'
                ];
                readonly examples: readonly ['parameter-not-valid'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['ID value is not valid.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Parameter not valid.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'source', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`forbidden-access` `no-production-access` `access-denied`';
                readonly enum: readonly [
                  'forbidden-access',
                  'no-production-access',
                  'access-denied'
                ];
                readonly examples: readonly ['forbidden-access'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Access to this resource is forbidden.'];
              };
              readonly source: {
                readonly title: 'Source';
                readonly type: 'object';
                readonly properties: {
                  readonly parameter: {
                    readonly type: 'string';
                    readonly description: 'String indicating which URI query parameter caused the error.';
                    readonly examples: readonly ['userId'];
                  };
                  readonly pointer: {
                    readonly type: 'string';
                    readonly description: 'Location to the object or attribute that the error relates to.';
                    readonly examples: readonly ['users/userId'];
                  };
                };
                readonly description: 'An object containing references to the source of the error.';
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Forbidden Access'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`resource-not-found`';
                readonly enum: readonly ['resource-not-found'];
                readonly examples: readonly ['resource-not-found'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Resource not found.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Requested resource is not found.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '500': {
      readonly required: readonly ['correlationId', 'data', 'type'];
      readonly type: 'object';
      readonly properties: {
        readonly correlationId: {
          readonly type: 'string';
          readonly description: 'Unique identifier for this particular occurrence of the problem.';
          readonly examples: readonly ['ac5ah5i'];
        };
        readonly data: {
          readonly type: 'array';
          readonly description: 'Error data.';
          readonly items: {
            readonly required: readonly ['code', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly code: {
                readonly type: 'string';
                readonly description: 'Application-specific error code, expressed as a string value.\n\n`internal-server-error`';
                readonly enum: readonly ['internal-server-error'];
                readonly examples: readonly ['internal-server-error'];
              };
              readonly detail: {
                readonly type: 'string';
                readonly description: 'Human-readable explanation specific to this occurrence of the problem.';
                readonly examples: readonly ['Internal Server error. Contact support.'];
              };
              readonly title: {
                readonly type: 'string';
                readonly description: 'Title of the error';
                readonly examples: readonly ['Internal Server error.'];
              };
              readonly type: {
                readonly type: 'string';
                readonly description: 'Type of the response, always "error"';
                readonly examples: readonly ['error'];
              };
            };
          };
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Always "list".';
          readonly examples: readonly ['list'];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
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
