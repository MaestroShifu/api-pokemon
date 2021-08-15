import jwt, { JwtPayload } from 'jsonwebtoken';
import { getEnviroment } from '../config/config';

const env = getEnviroment();

interface IGenerateTokenArgs {
  [key: string]: string;
}

export const generateToken = (args: IGenerateTokenArgs): string => {
  return jwt.sign(args, env.JWT_KEY, {
    expiresIn: '20m'
  });
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, env.JWT_KEY);
};
