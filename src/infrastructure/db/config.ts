import { config } from '#Shared/config';

export = {
  development: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.database,
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres' as const,
    logging: false,
    dialectOptions: {
      collate: 'ru_RU.UTF-8',
    },
    define: {
      charset: 'ru_RU.UTF-8',
    },
  },
  production: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.database,
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres' as const,
    logging: false,
    dialectOptions: {
      collate: 'ru_RU.UTF-8',
    },
    define: {
      charset: 'ru_RU.UTF-8',
    },
  },
  test: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.database + '_test',
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres' as const,
    logging: false,
    dialectOptions: {
      collate: 'ru_RU.UTF-8',
    },
    define: {
      charset: 'ru_RU.UTF-8',
    },
  },
};
