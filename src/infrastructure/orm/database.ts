import Knex from 'knex';
import createDebug from 'debug';
import { Model } from 'objection';
import { getEnviroment } from '../config/config';

const env = getEnviroment();
const debug = createDebug('Database:connect');

export const startDataBase = async (): Promise<void> => {
  const database = Knex({
    acquireConnectionTimeout: +env.TIME_OUT,
    client: 'pg',
    connection: env.DATABASE_URL,
    pool: {
      min: 1,
      max: 5
    }
  });
  try {
    await database.raw('SET timezone="UTC";');
    await database.raw('select version();');
    Model.knex(database);
    debug('Connected to database: %s', env.DATABASE_URL);
  } catch (error) {
    debug('Failed connect to database: %j', error);
  }
};
