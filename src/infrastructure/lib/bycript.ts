import bcrypt from 'bcryptjs';
import { getEnviroment } from '../config/config';

const env = getEnviroment();

export const generateHash = (text: string): string => {
  const salt = bcrypt.genSaltSync(+env.SALT);
  return bcrypt.hashSync(text, salt);
};

export const compareHash = (hash: string, text: string): boolean => {
  return bcrypt.compareSync(text, hash);
};
