import { Request } from 'express';
import {
  IPorfileLoginArgs,
  IProfileCreateArgs
} from '../../domain/repository/profile-repository';
import {
  validEmail,
  validOnlyLetters,
  validPassword
} from './utils/validators';

export const authRegisterSerializers = (req: Request): IProfileCreateArgs => {
  const email = validEmail(req.body.email);
  const name = req.body.name
    ? validOnlyLetters(req.body.name, 'name')
    : undefined;
  const last_name = req.body.last_name
    ? validOnlyLetters(req.body.last_name, 'last_name')
    : undefined;
  const password = validPassword(req.body.password);
  if (password !== req.body.re_password) {
    throw {
      statusCode: 400,
      message: 'Passwords do not match'
    };
  }
  return {
    email,
    name,
    last_name,
    password
  };
};

export const authLoginSerializers = (req: Request): IPorfileLoginArgs => {
  const email = validEmail(req.body.email);
  const password = validPassword(req.body.password);
  return {
    email,
    password
  };
};
