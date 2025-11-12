import { config } from '#Shared/config';
import { SequelizeDB } from '#Lib/database/sequelize';

export default new SequelizeDB({
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  host: config.database.host,
  port: config.database.port,
  logging: false,
  dialectOptions: {
    collate: 'ru_RU.UTF-8',
  },
  dialect: 'postgres',
  define: {
    charset: 'ru_RU.UTF-8',
  },
});
