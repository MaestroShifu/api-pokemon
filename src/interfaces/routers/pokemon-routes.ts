import { Router } from 'express';
import { pokemonController } from '../controllers/pokemon-controller';
// import { Swagger } from '../../infrastructure/swagger/swagger';

// const validator = Swagger.getSwaggerValidator('Pokemon');

export const getRoutesPokemon = (): Router => {
  const pokemonRoutes = Router({
    strict: true,
    caseSensitive: true
  });

  pokemonRoutes.post('/pokemon', pokemonController.create);
  pokemonRoutes.put('/pokemon/:id', pokemonController.update);
  pokemonRoutes.delete('/pokemon/:id', pokemonController.delete);

  return pokemonRoutes;
};
