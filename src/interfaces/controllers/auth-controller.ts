import { Request, Response } from 'express';
import createDebug from 'debug';
import { registerProfile } from '../../application/use_case/auth/register-case';
import {
  authLoginSerializers,
  authRegisterSerializers
} from '../serializers/auth-serializers';
import { loginProfile } from '../../application/use_case/auth/login-case';

const debug = createDebug('Server:AuthController');

export const authController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start register new profile: %j', req.body);
      const args = authRegisterSerializers(req);
      const { execute } = registerProfile(args);
      const result = await execute();
      debug('Succesfull register new profile: %j', result);
      res.status(201).send(result);
    } catch (error) {
      debug('Error server internal: %j', error);
      const result = {
        statusCode: error.statusCode ? error.statusCode : 500,
        message: error.statusCode
          ? error.message
          : 'Upps and error... try again later!'
      };
      res.status(result.statusCode).send(result);
    }
  },
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start login profile: %j', req.body);
      const args = authLoginSerializers(req);
      const { execute } = loginProfile(args);
      const result = await execute();
      debug('Succesfull login profile: %j', result);
      res.status(201).send(result);
    } catch (error) {
      debug('Error server internal: %j', error);
      const result = {
        statusCode: error.statusCode ? error.statusCode : 500,
        message: error.statusCode
          ? error.message
          : 'Upps and error... try again later!'
      };
      res.status(result.statusCode).send(result);
    }
  }
};
