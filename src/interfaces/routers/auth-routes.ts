import { Router, Request, Response } from 'express';
import { Swagger } from '../../infrastructure/swagger/swagger';

const validator = Swagger.getSwaggerValidator();

export const getRoutesAuth = (): Router => {
  const authRoutes = Router({
    strict: true,
    caseSensitive: true
  });

  authRoutes.post(
    '/auth/register',
    validator.validate('post', '/auth/register'),
    (_req: Request, res: Response) => {
      res.status(200).send('funciona!!');
    }
  );

  return authRoutes;
};

// throw { statusCode: 404, message: 'Not supported' };
