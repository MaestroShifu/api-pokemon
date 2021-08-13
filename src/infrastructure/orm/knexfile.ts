import path from 'path';
import { getEnviroment } from '../config/config';

const env = getEnviroment();

export default {
  acquireConnectionTimeout: +env.TIME_OUT,
  client: 'pg',
  connection: env.DATABASE_URL,
  pool: {
    min: 1,
    max: 5
  },
  migrations: {
    directory: path.join(path.dirname(__filename), './migrations'),
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(path.dirname(__filename), './seeds')
  }
};
