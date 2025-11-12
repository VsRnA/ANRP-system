export const schema = {
  type: 'object',
  properties: {
    HTTP_HOST: {
      type: 'string',
      default: '0.0.0.0',
      description: 'HTTP хост',
    },
    HTTP_PORT: {
      type: 'number',
      default: 3000,
      description: 'HTTP порт',
    },
    POSTGRES_USER: {
      type: 'string',
      default: 'postgres',
      description: 'Имя пользователя PostgreSQL',
    },
    POSTGRES_PASSWORD: {
      type: 'string',
      description: 'Пароль пользователя PostgreSQL',
    },
    POSTGRES_DB: {
      type: 'string',
      default: 'iPostgres',
      description: 'Название базы данных PostgreSQL',
    },
    POSTGRES_HOST: {
      type: 'string',
      default: 'postgres',
      description: 'Хост PostgreSQL (имя сервиса в Docker или localhost)',
    },
    POSTGRES_PORT: {
      type: 'number',
      default: 5432,
      description: 'Порт PostgreSQL',
    },
    JWT_SECRET: {
      type: 'string',
      description: 'JWT secret'
    }
  },
  required: [
    'HTTP_HOST',
    'HTTP_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'JWT_SECRET'
  ],
} as const;
