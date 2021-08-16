import { Router } from 'express';
import { validateToken } from '../../infrastructure/middlewares/validate-token';
import { pokemonController } from '../controllers/pokemon-controller';
import { Swagger } from '../../infrastructure/swagger/swagger';

const validator = Swagger.getSwaggerValidator('Pokemon');

export const getRoutesPokemon = (): Router => {
  const pokemonRoutes = Router({
    strict: true,
    caseSensitive: true
  });

  pokemonRoutes.post(
    '/pokemon',
    validator.validate('post', '/pokemon'),
    validateToken,
    pokemonController.create
  );
  pokemonRoutes.put(
    '/pokemon/:id',
    validator.validate('put', '/pokemon/{id}'),
    validateToken,
    pokemonController.update
  );
  pokemonRoutes.delete('/pokemon/:id', pokemonController.delete);

  return pokemonRoutes;
};
