import dotenv, { DotenvConfigOptions } from 'dotenv';
import path from 'path';

export enum Environment {
  dev = 'dev',
  prod = 'prod',
  test = 'test'
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
  if (urlPath) {
    const configEnv: DotenvConfigOptions = {
      path: path.join(path.dirname(__filename), urlPath)
    };
    dotenv.config(configEnv);
  }
};

interface IEnviroment {
  ENV_NODE: Environment;
  PORT: string;
  DATABASE_URL: string;
}

export const getEnviroment = (): IEnviroment => {
  loadEnviroment(process.env.NODE_ENV as Environment);
  return {
    ENV_NODE: (process.env.NODE_ENV as Environment) || Environment.dev,
    PORT: process.env.PORT || '5000',
    DATABASE_URL: process.env.DATABASE_URL || ''
  };
};