import { Router } from 'express';
import { Swagger } from '../../infrastructure/swagger/swagger';

export const getRoutesSwagger = (): Router => {
  const swaggerUI = Swagger.getSwaggerUI();
  const swaggerRoutes = Router({
    strict: true,
    caseSensitive: true
  });
  swaggerRoutes.use('/api-docs', swaggerUI.serve, swaggerUI.setup);
  return swaggerRoutes;
};
