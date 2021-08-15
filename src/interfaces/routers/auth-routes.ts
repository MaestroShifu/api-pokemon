import { Router } from 'express';
import { Swagger } from '../../infrastructure/swagger/swagger';
import { authController } from '../controllers/auth-controller';

const validator = Swagger.getSwaggerValidator('Auth');

export const getRoutesAuth = (): Router => {
  const authRoutes = Router({
    strict: true,
    caseSensitive: true
  });

  authRoutes.post(
    '/auth/register',
    validator.validate('post', '/auth/register'),
    authController.register
  );

  authRoutes.post(
    '/auth/login',
    validator.validate('post', '/auth/login'),
    authController.login
  );

  return authRoutes;
};
