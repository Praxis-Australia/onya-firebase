const CreateUser = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The end-users email address. Mandatory if mobile is not supplied.',
        examples: ['gavin@hooli.com'],
      },
      mobile: {
        type: 'string',
        description:
          'The end-users mobile number, supplied in international format. +[country-code][mobileno]. Mandatory if email is not supplied.',
        examples: ['+61410888999'],
      },
      firstName: {
        type: 'string',
        description: 'The end-users first name as an optional additional parameter.',
        examples: ['Gavin'],
      },
      lastName: {
        type: 'string',
        description: 'The end-users last name as an optional additional parameter.',
        examples: ['Belson'],
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '201': {
      title: 'UserPostResponse',
      required: ['id', 'links', 'mobile', 'type'],
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Type of the response, always "user".',
          examples: ['user'],
        },
        id: {
          type: 'string',
          description: 'A string that uniquely identifies the user.',
          examples: ['e1956419'],
        },
        email: {
          type: 'string',
          description: 'The end-users email address.',
          format: 'email',
          examples: ['gavin@hooli.com'],
        },
        mobile: {
          type: 'string',
          description: 'The end-users mobile number.',
          examples: [61410888999],
        },
        firstName: {
          type: 'string',
          description: 'The end-users first name as an optional additional parameter.',
          examples: ['Gavin'],
        },
        lastName: {
          type: 'string',
          description: 'The end-users last name as an optional additional parameter.',
          examples: ['Belson'],
        },
        links: {
          title: 'ResourceLink',
          required: ['self'],
          type: 'object',
          properties: {
            self: {
              type: 'string',
              description: 'URL of the resource.',
              examples: ['https://au-api.basiq.io/link/a3dgf4567a89'],
            },
          },
          description: 'Link object containing a link to the resource, self reference.',
        },
      },
      description: 'User object with details if the creation succeeded.',
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteAuthLink = {
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
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
  },
} as const;
const DeleteConsent = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'User identification.',
          },
          consentId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Consent identification.',
          },
        },
        required: ['userId', 'consentId'],
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
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
  },
} as const;
const DeleteUser = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'User identification.',
          },
        },
        required: ['userId'],
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
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
  },
} as const;
const GetAuthLink = {
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
    '200': {
      required: ['expiresAt', 'id', 'mobile', 'type', 'userId'],
      type: 'object',
      properties: {
        expiresAt: {
          type: 'string',
          description: 'The date time of auth link expiry.',
          examples: ['2019-11-21T04:08:50.000Z'],
        },
        id: {
          type: 'string',
          description: 'Uniquely identifies the auth link.',
          examples: ['63448be4'],
        },
        links: {
          required: ['public', 'self'],
          type: 'object',
          properties: {
            public: {
              type: 'string',
              description: 'Public URL of auth link.',
              examples: ['https://connect.basiq.io/63448be4'],
            },
            self: {
              type: 'string',
              description: 'URL of the resource',
              examples: ['/users/ec4ea48d/auth_link'],
            },
          },
        },
        mobile: {
          type: 'string',
          description: "A user's mobile phone, used as for authentication.",
          examples: [61410000000],
        },
        type: {
          type: 'string',
          description: 'Type of the response, always "auth_link".',
          examples: ['auth_link'],
        },
        userId: {
          type: 'string',
          description: 'A string that uniquely identifies the user.',
          examples: ['ec4ea48d'],
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '410': {
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
                  'Application-specific error code, expressed as a string value.\n\n`resource-no-longer-available`',
                enum: ['resource-no-longer-available'],
                examples: ['resource-no-longer-available'],
              },
              detail: {
                type: 'string',
                description:
                  'Human-readable explanation specific to this occurrence of the problem.',
              },
              title: { type: 'string', description: 'Title of the error' },
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
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
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
  },
} as const;
const GetConsents = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user',
          },
        },
        required: ['userId'],
      },
    ],
  },
  response: {
    '200': {
      title: 'UserConsentGetResponse',
      required: ['type', 'size', 'data'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "list".', examples: ['list'] },
        size: {
          type: 'integer',
          description: 'Number of items in the list',
          format: 'int64',
          examples: [1],
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        data: {
          type: 'array',
          items: { type: 'object', additionalProperties: true },
          description: 'User consents data.',
        },
      },
      description: 'List containing existing user consents.',
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetEvents = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            examples: ['user.id.eq(userId) OR event.entity.eq(entity), event.type.eq(type)'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'userId for the specific user you wish to retrieve events for. e.g user.id.eq(userId) Entity can be filtered with type for events for. e.g event.entity.eq(entity), event.type.eq(type)',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      title: 'EventsGetResponseResource',
      required: ['type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Type, always "list".', examples: ['list'] },
        data: {
          type: 'array',
          items: {
            required: [
              'createdDate',
              'id',
              'links',
              'type',
              'entity',
              'userId',
              'dataRef',
              'data',
              'eventType',
            ],
            type: 'object',
            properties: {
              type: { type: 'string', description: 'Type, always "event".', examples: ['event'] },
              id: { type: 'string', description: 'Event identification.', examples: ['61723'] },
              createdDate: {
                type: 'string',
                description: 'Date the event was created.',
                examples: ['2019-07-29T07:34:09Z'],
              },
              entity: {
                type: 'string',
                description:
                  'The entity associated with the event that has occurred\n\n`consent` `connection`',
                enum: ['consent', 'connection'],
                examples: ['consent'],
              },
              eventType: {
                type: 'string',
                description:
                  'The type of event that has occurred\n\n`revoked` `expired` `updated` `created` `archived` `deleted`',
                enum: ['revoked', 'expired', 'updated', 'created', 'archived', 'deleted'],
                examples: ['revoked'],
              },
              userId: {
                type: 'string',
                description: 'The identifier of the user the event belongs to.',
                examples: ['266f5849-6ef6-4aae-accf-386470d0598e'],
              },
              dataRef: {
                type: 'string',
                description: 'URL to the data source the event occurred.',
                examples: ['https://au-api.basiq.io/users/266f5849-6ef6-4aae-accf-386470d0598e'],
              },
              data: {
                type: 'string',
                description: 'The data associated with the event that has been created.',
              },
              links: {},
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
              examples: ['https://au-api.basiq.io/link/a3dgf4567a89'],
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Service Unavailable'],
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
  },
} as const;
const GetJobs = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          jobId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the job to be retrieved.',
          },
        },
        required: ['jobId'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        type: { type: 'string' },
        id: { type: 'string' },
        created: {
          description: 'date and time in ISO format of when the job request was created',
          type: 'string',
          format: 'date-time',
        },
        updated: {
          description: 'date and time in ISO format of when the job request was updated',
          type: 'string',
          format: 'date-time',
        },
        steps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'object', additionalProperties: true },
              status: { type: 'object', additionalProperties: true },
              result: { type: 'object', properties: { type: { type: 'string' } } },
            },
          },
        },
        links: { type: 'object', properties: { link: { type: 'string' } } },
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetUser = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user to be retrieved.',
          },
        },
        required: ['userId'],
      },
    ],
  },
  response: {
    '200': {
      title: 'UserGetResponse',
      required: ['accounts', 'connections', 'email', 'id', 'links', 'mobile', 'name', 'type'],
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Always "user".', examples: ['user'] },
        id: { type: 'string', description: 'User identification.', examples: ['ea3a81'] },
        accounts: {
          title: 'UserGetAccount',
          required: ['count', 'data', 'type'],
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Always "list".', examples: ['list'] },
            count: {
              type: 'integer',
              description: 'Count of accounts.',
              format: 'int64',
              examples: [7],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            data: {
              type: 'array',
              description: 'Accounts data.',
              items: {
                title: 'UserGetAccountData',
                required: ['id', 'links', 'type'],
                type: 'object',
                properties: {
                  type: { type: 'string', description: 'Always "account".', examples: ['account'] },
                  id: {
                    type: 'string',
                    description: 'Account identification.',
                    examples: ['aaaf2c3b'],
                  },
                  links: {
                    title: 'ResourceLink',
                    required: ['self'],
                    type: 'object',
                    properties: {
                      self: {
                        type: 'string',
                        description: 'URL of the resource.',
                        examples: ['https://au-api.basiq.io/link/a3dgf4567a89'],
                      },
                    },
                    description: 'Link object containing a link to the resource, self reference.',
                  },
                },
                description: 'Object containing account data.',
              },
            },
          },
          description: 'Container object containing account data.',
        },
        connections: {
          title: 'UserGetConnection',
          required: ['count', 'data', 'type'],
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Always "list".', examples: ['list'] },
            count: {
              type: 'integer',
              description: 'Count of accounts.',
              format: 'int64',
              examples: [5],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            data: {
              type: 'array',
              description: 'Connections data.',
              items: {
                title: 'GetUserConnectionData',
                required: ['id', 'links', 'type'],
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    description: 'Always "connection".',
                    examples: ['connection'],
                  },
                  id: {
                    type: 'string',
                    description: 'Connection identification.',
                    examples: ['aaaf2c3b'],
                  },
                  links: {
                    title: 'ResourceLink',
                    required: ['self'],
                    type: 'object',
                    properties: {
                      self: {
                        type: 'string',
                        description: 'URL of the resource.',
                        examples: ['https://au-api.basiq.io/link/a3dgf4567a89'],
                      },
                    },
                    description: 'Link object containing a link to the resource, self reference.',
                  },
                },
                description: 'Object containing connection data.',
              },
            },
          },
          description: 'Container object containing connection data.',
        },
        email: {
          type: 'string',
          description: 'User email or empty.',
          format: 'email',
          examples: ['gavin@hooli.com'],
        },
        mobile: {
          type: 'string',
          description: 'User mobile number, or empty.',
          examples: [61410888666],
        },
        name: { type: 'string', description: 'Name, or empty.', examples: ['Gavin Belson'] },
        links: {
          title: 'GetUserLinks',
          required: ['accounts', 'auth_link', 'connections', 'self', 'transactions'],
          type: 'object',
          properties: {
            accounts: {
              type: 'string',
              description: 'Accounts reference url.',
              examples: ['https://au-api.basiq.io/users/a3dgf4567a89/accounts'],
            },
            connections: {
              type: 'string',
              description: 'Connections reference url.',
              examples: ['https://au-api.basiq.io/users/a3dgf4567a89/connections'],
            },
            self: {
              type: 'string',
              description: 'User self reference url.',
              examples: ['https://au-api.basiq.io/user/a3dgf4567a89'],
            },
            transactions: {
              type: 'string',
              description: 'Transactions reference url.',
              examples: ['https://au-api.basiq.io/users/a3dgf4567a89/transactions'],
            },
          },
          description: 'Object containing links to resources.',
        },
      },
      description: 'User object with details if the creation succeeded.',
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetUserJobs = {
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
      {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: "Connection identification filter. e.g. connection.id.eq('ab63cd')",
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      required: ['data', 'links', 'size', 'type'],
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Type of the response, always "list".',
          examples: ['list'],
        },
        data: {
          type: 'array',
          description: 'Container object, containing job details.',
          items: {
            title: 'JobsData',
            required: ['created', 'id', 'institution', 'steps', 'updated'],
            type: 'object',
            properties: {
              type: { type: 'string', description: 'Value is "job".', examples: ['job'] },
              id: {
                type: 'string',
                description: 'A string that uniquely identifies the job.',
                examples: ['e9132638'],
              },
              created: {
                type: 'string',
                description: 'The date time when the job was created.',
                examples: ['2020-06-10T09:59:00Z'],
              },
              updated: {
                type: 'string',
                description: 'The date time when the job was last updated.',
                examples: ['2020-06-10T09:59:00Z'],
              },
              institution: {
                title: 'Institution',
                required: ['id', 'links', 'type'],
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'A string that uniquely identifies institution.',
                    examples: ['AU00000'],
                  },
                  links: {
                    title: 'JobsLinks',
                    required: ['self'],
                    type: 'object',
                    properties: {
                      self: {
                        type: 'string',
                        description: 'URL of the resource',
                        examples: ['https://au-api.basiq.io/jobs/61723'],
                      },
                      source: {
                        type: 'string',
                        description:
                          'Resource that initiated creation of this Job. For example, for operations on Connection, this is a Connection URL. This is only returned for Connection jobs and not for Statement jobs.',
                        examples: ['https://au-api.basiq.io/users/ea3a81/connections/8fce3b'],
                      },
                    },
                    description: 'Links to the resources.',
                  },
                  type: {
                    type: 'string',
                    description: 'Always "institution".',
                    examples: ['institution'],
                  },
                },
                description: 'Institution details.',
              },
              steps: {
                type: 'array',
                description: 'List of steps that need to be completed.',
                items: {
                  title: 'JobsStep',
                  required: ['result', 'status'],
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      description:
                        'Name of the step the job needs to complete.\n\n`verify-credentials` `retrieve-accounts` `retrieve-transactions` `retrieve-statements`',
                      enum: [
                        'verify-credentials',
                        'retrieve-accounts',
                        'retrieve-transactions',
                        'retrieve-statements',
                      ],
                      examples: ['retrieve-accounts'],
                    },
                    status: {
                      type: 'string',
                      description:
                        'Status of the job step\n\n`pending` `in-progress` `success` `failed`',
                      enum: ['pending', 'in-progress', 'success', 'failed'],
                      examples: ['success'],
                    },
                    result: {
                      title: 'JobsResult',
                      type: 'object',
                      properties: {
                        code: {
                          type: 'string',
                          description:
                            'In case of failed job, displays error code.\n\n`success` `user-action-required` `system-unavailable` `maintenance` `connector-error` `institution-not-found` `institution-not-available` `institution-disabled` `missing-required-field` `missing-required-field-value` `invalid-field-value` `invalid-csv-row` `row-count-exceeded` `account-data-differs` `empty-file` `bank-statement-invalid` `bank-statement-new-product` `bank-statement-parsing-error` `bank-statement-not-supported` `txn-after-last-updated-date` `invalid-connection` `unknown-error` `job-timed-out`',
                          enum: [
                            'success',
                            'user-action-required',
                            'system-unavailable',
                            'maintenance',
                            'connector-error',
                            'institution-not-found',
                            'institution-not-available',
                            'institution-disabled',
                            'missing-required-field',
                            'missing-required-field-value',
                            'invalid-field-value',
                            'invalid-csv-row',
                            'row-count-exceeded',
                            'account-data-differs',
                            'empty-file',
                            'bank-statement-invalid',
                            'bank-statement-new-product',
                            'bank-statement-parsing-error',
                            'bank-statement-not-supported',
                            'txn-after-last-updated-date',
                            'invalid-connection',
                            'unknown-error',
                            'job-timed-out',
                          ],
                        },
                        details: {
                          type: 'string',
                          description: 'In case of failed job, displays details of the error.',
                        },
                        title: {
                          type: 'string',
                          description: 'In case of failed job, displays error title.',
                        },
                        type: {
                          type: 'string',
                          description: 'In case of success, Always "link".',
                          examples: ['link'],
                        },
                        url: {
                          type: 'string',
                          description:
                            'In case of success, URL of the updated (or created) resources.',
                        },
                      },
                      description:
                        'Result object containing a list of URLs or null. Otherwise if a step failed contains an error response.',
                    },
                  },
                  description: 'List of steps that need to be completed.',
                },
              },
              links: {
                title: 'JobsLinks',
                required: ['self'],
                type: 'object',
                properties: {
                  self: {
                    type: 'string',
                    description: 'URL of the resource',
                    examples: ['https://au-api.basiq.io/jobs/61723'],
                  },
                  source: {
                    type: 'string',
                    description:
                      'Resource that initiated creation of this Job. For example, for operations on Connection, this is a Connection URL. This is only returned for Connection jobs and not for Statement jobs.',
                    examples: ['https://au-api.basiq.io/users/ea3a81/connections/8fce3b'],
                  },
                },
                description: 'Links to the resources.',
              },
            },
            description: 'Container object, containing job details.',
          },
        },
        size: {
          type: 'integer',
          description: 'Size of the all the jobs.',
          format: 'int64',
          examples: [100],
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        links: {
          title: 'ResourceLink',
          required: ['self'],
          type: 'object',
          properties: {
            self: {
              type: 'string',
              description: 'URL of the resource.',
              examples: ['https://au-api.basiq.io/link/a3dgf4567a89'],
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostAuthLink = {
  body: {
    type: 'object',
    properties: { mobile: { type: 'string' } },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: { type: 'string', $schema: 'http://json-schema.org/draft-04/schema#' },
        },
        required: ['userId'],
      },
    ],
  },
  response: {
    '201': {
      required: ['expiresAt', 'mobile', 'type', 'userId'],
      type: 'object',
      properties: {
        expiresAt: {
          type: 'string',
          description: 'The date time of auth link expiry.',
          examples: ['2019-11-21T04:08:50.000Z'],
        },
        links: {
          required: ['public', 'self'],
          type: 'object',
          properties: {
            public: {
              type: 'string',
              description: 'Public URL of auth link.',
              examples: ['https://connect.basiq.io/63448be4'],
            },
            self: {
              type: 'string',
              description: 'URL of the resource',
              examples: ['/users/ec4ea48d/auth_link'],
            },
          },
        },
        mobile: {
          type: 'string',
          description: "A user's mobile phone, used as for authentication.",
          examples: [61410000000],
        },
        type: {
          type: 'string',
          description: 'Type of the response, always "auth_link".',
          examples: ['auth_link'],
        },
        userId: {
          type: 'string',
          description: 'A string that uniquely identifies the user.',
          examples: ['ec4ea48d'],
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostJobMfa = {
  body: {
    required: ['mfa-response'],
    type: 'object',
    properties: {
      'mfa-response': {
        type: 'array',
        description: 'One time password or answer to a security question/s e.g. ["1234"]',
        items: { type: 'string' },
        examples: ['1234'],
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          jobId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the job.',
          },
        },
        required: ['jobId'],
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
              examples: ['https://au-api.basiq.io/link/a3dgf4567a89'],
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostToken = {
  formData: {
    properties: {
      scope: { type: 'string', examples: ['CLIENT_ACCESS'] },
      userId: { type: 'string' },
    },
    type: 'object',
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'basiq-version': {
            type: 'string',
            examples: ['3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['basiq-version'],
      },
    ],
  },
  response: {
    '200': {
      required: ['access_token', 'expires_in', 'token_type'],
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          examples: [
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          ],
        },
        expires_in: {
          type: 'integer',
          description: 'Expires in seconds',
          format: 'int64',
          examples: [3600],
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        token_type: { type: 'string', examples: ['Bearer'] },
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UpdateUser = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The end-users email address.',
        examples: ['gavin@hooli.com'],
      },
      mobile: {
        type: 'string',
        description: 'The end-users mobile number.',
        examples: ['+61410888666'],
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The identifier of the user to be retrieved.',
          },
        },
        required: ['userId'],
      },
    ],
  },
  response: {
    '200': {
      title: 'UserPostResponse',
      required: ['id', 'links', 'mobile', 'type'],
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Type of the response, always "user".',
          examples: ['user'],
        },
        id: {
          type: 'string',
          description: 'A string that uniquely identifies the user.',
          examples: ['e1956419'],
        },
        email: {
          type: 'string',
          description: 'The end-users email address.',
          format: 'email',
          examples: ['gavin@hooli.com'],
        },
        mobile: {
          type: 'string',
          description: 'The end-users mobile number.',
          examples: [61410888999],
        },
        firstName: {
          type: 'string',
          description: 'The end-users first name as an optional additional parameter.',
          examples: ['Gavin'],
        },
        lastName: {
          type: 'string',
          description: 'The end-users last name as an optional additional parameter.',
          examples: ['Belson'],
        },
        links: {
          title: 'ResourceLink',
          required: ['self'],
          type: 'object',
          properties: {
            self: {
              type: 'string',
              description: 'URL of the resource.',
              examples: ['https://au-api.basiq.io/link/a3dgf4567a89'],
            },
          },
          description: 'Link object containing a link to the resource, self reference.',
        },
      },
      description: 'User object with details if the creation succeeded.',
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
              type: {
                type: 'string',
                description: 'Type of the response, always "error"',
                examples: ['error'],
              },
              title: {
                type: 'string',
                description: 'Title of the error',
                examples: ['Parameter not valid.'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
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
            required: ['code', 'source', 'type'],
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
                examples: ['Forbidden Access'],
              },
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
                    examples: ['id'],
                  },
                },
                description: 'An object containing references to the source of the error.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
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
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
export {
  CreateUser,
  DeleteAuthLink,
  DeleteConsent,
  DeleteUser,
  GetAuthLink,
  GetConsents,
  GetEvents,
  GetJobs,
  GetUser,
  GetUserJobs,
  PostAuthLink,
  PostJobMfa,
  PostToken,
  UpdateUser,
};
