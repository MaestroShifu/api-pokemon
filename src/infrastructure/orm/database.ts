import Knex from 'knex';
import createDebug from 'debug';
import { Model } from 'objection';
import { getEnviroment } from '../config/config';
import configDB from './knexfile';

const env = getEnviroment();
const debug = createDebug('Server:connect');

export const startDataBase = async (): Promise<boolean> => {
  const database = Knex(configDB);
  try {
    await database.raw('SET timezone="UTC";');
    await database.raw('select version();');
    Model.knex(database);
    debug('Connected to database: %s', env.DATABASE_URL);
    return true;
  } catch (error) {
    debug('Failed connect to database: %j', error);
    return false;
  }
};
