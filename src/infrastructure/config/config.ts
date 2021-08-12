import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(path.dirname(__filename), '../../../.env')
});

enum Enviroments {
  'dev' = 'dev',
  'prod' = 'prod',
  'test' = 'test'
}

const ENV_NODE: Enviroments =
  (process.env.ENV_NODE as Enviroments) || Enviroments.dev;
const PORT: string = process.env.PORT || '3000';
const DATABASE_URL: string = process.env.DATABASE_URL || '';

export default {
  ENV_NODE,
  PORT,
  DATABASE_URL
};
