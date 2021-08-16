import { Request, Response } from 'express';
import createDebug from 'debug';
import { createPokemon } from '../../application/use_case/pokemon/create-case';
import { updatePokemon } from '../../application/use_case/pokemon/update-case';
import { deletePokemon } from '../../application/use_case/pokemon/delete-case';

const debug = createDebug('Server:PokemonController');

export const pokemonController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start create new pokemon: %j', req.body);
      // agregar serializer
      const { execute } = createPokemon(req.body);
      const result = await execute();
      debug('Succesfull create new pokemon: %j', result);
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
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start update pokemon: %j', req.body);
      // agregar serializer
      const { execute } = updatePokemon(req.body, req.params.id);
      const result = await execute();
      debug('Succesfull update pokemon: %j', result);
      res.status(200).send(result);
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
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start delete pokemon: %s', req.params.id);
      // agregar serializer
      const { execute } = deletePokemon(req.params.id);
      const result = await execute();
      debug('Succesfull delete pokemon: %j', result);
      res.status(204).send();
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
