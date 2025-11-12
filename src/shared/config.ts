import { env } from '#Infrastructure/env';

export const config = {
  http: {
    host: env.get('HTTP_HOST'),
    port: env.get('HTTP_PORT'),
  },
  database: {
    user: env.get('POSTGRES_USER'),
    password: env.get('POSTGRES_PASSWORD'),
    database: env.get('POSTGRES_DB'),
    host: env.get('POSTGRES_HOST'),
    port: env.get('POSTGRES_PORT'),
  },
  jwt: {
    secret: env.get('JWT_SECRET'),
  },
  logger: false,
};
