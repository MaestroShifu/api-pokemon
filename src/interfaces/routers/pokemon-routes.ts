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

  pokemonRoutes.get(
    '/me/pokemon',
    validator.validate('get', '/me/pokemon'),
    validateToken,
    pokemonController.getMeAll
  );
  pokemonRoutes.get(
    '/pokemon',
    validator.validate('get', '/pokemon'),
    validateToken,
    pokemonController.getAll
  );
  pokemonRoutes.get(
    '/pokemon/:id',
    validator.validate('get', '/pokemon/{id}'),
    validateToken,
    pokemonController.getById
  );
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
  pokemonRoutes.delete(
    '/pokemon/deleteall',
    validator.validate('delete', '/pokemon/deleteall'),
    validateToken,
    pokemonController.deleteAll
  );
  pokemonRoutes.delete(
    '/pokemon/:id',
    validator.validate('delete', '/pokemon/{id}'),
    validateToken,
    pokemonController.delete
  );

  return pokemonRoutes;
};
