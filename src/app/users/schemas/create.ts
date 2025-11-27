export const CreateSchema = {
  payload: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 6,
      },
      firstName: {
        type: 'string',
        minLength: 1,
      },
      lastName: {
        type: 'string',
        minLength: 1,
      },
      roleId: {
        type: 'number',
      },
    },
    required: ['email', 'password', 'firstName', 'lastName', 'roleId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            guid: { type: 'string' },
            email: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            roles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  keyWord: { type: 'string' },
                },
              },
            },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
  },
} as const;
