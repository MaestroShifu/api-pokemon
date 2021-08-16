import jwt from 'jsonwebtoken';
import { getEnviroment } from '../config/config';

const env = getEnviroment();

export interface IGenerateTokenArgs {
  [key: string]: string;
}

export const generateToken = (args: IGenerateTokenArgs): string => {
  return jwt.sign(args, env.JWT_KEY, {
    expiresIn: '20m'
  });
};

export const verifyToken = (token: string): IGenerateTokenArgs => {
  return jwt.verify(token, env.JWT_KEY) as IGenerateTokenArgs;
};
