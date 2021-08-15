import dotenv, { DotenvConfigOptions } from 'dotenv';
import path from 'path';

export enum Environment {
  'dev' = 'dev',
  'prod' = 'prod',
  'test' = 'test'
}

const loadEnviroment = (env: Environment) => {
  let urlPath;
  switch (env) {
    case Environment.dev:
      urlPath = '../../../environment/development.env';
      break;
    case Environment.prod:
      urlPath = '../../../environment/production.env';
      break;
    case Environment.test:
      urlPath = '../../../environment/test.envs';
      break;
  }
  const configEnv: DotenvConfigOptions = {
    path: path.join(path.dirname(__filename), urlPath)
  };
  dotenv.config(configEnv);
};

interface IEnviroment {
  ENV_NODE: Environment;
  PORT: string;
  DATABASE_URL: string;
  TIME_OUT: string;
  SALT: string;
  JWT_KEY: string;
}

export const getEnviroment = (): IEnviroment => {
  loadEnviroment((process.env.NODE_ENV as Environment) || Environment.dev);
  return {
    ENV_NODE: (process.env.NODE_ENV as Environment) || Environment.dev,
    PORT: process.env.PORT || '3000',
    DATABASE_URL: process.env.DATABASE_URL || '',
    TIME_OUT: process.env.TIME_OUT || '1000',
    SALT: process.env.SALT || '9',
    JWT_KEY: process.env.JWT_KEY || 'zzzzzz'
  };
};
