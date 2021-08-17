import { Request, Response } from 'express';
import createDebug from 'debug';
import { createPokemon } from '../../application/use_case/pokemon/create-case';
import { updatePokemon } from '../../application/use_case/pokemon/update-case';
import { deletePokemon } from '../../application/use_case/pokemon/delete-case';
import { IRequestAuth } from '../../infrastructure/middlewares/validate-token';
import {
  createPokemonSerializers,
  updatePokemonSerializers
} from '../serializers/pokemon-serializers';
import { deleteAllPokemon } from '../../application/use_case/pokemon/delete-all-case';
import { getByIdPokemon } from '../../application/use_case/pokemon/get-by-id-case';
import { getAllPublicPokemon } from '../../application/use_case/pokemon/get-all-case';
import { getMeAllPokemon } from '../../application/use_case/pokemon/get-me-all-case';

const debug = createDebug('Server:PokemonController');

export const pokemonController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start create new pokemon: %j', req.body);
      const args = createPokemonSerializers(req);
      const { execute } = createPokemon({
        ...args,
        profile_id: (req as IRequestAuth).userAuth.id
      });
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
      const args = updatePokemonSerializers(req);
      const { execute } = updatePokemon(
        {
          ...args,
          profile_id: (req as IRequestAuth).userAuth.id
        },
        req.params.id
      );
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
      const { execute } = deletePokemon(
        req.params.id,
        (req as IRequestAuth).userAuth.id
      );
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
  },
  deleteAll: async (req: Request, res: Response): Promise<void> => {
    try {
      debug(
        'Start delete all pokemon by user: %s',
        (req as IRequestAuth).userAuth.id
      );
      const { execute } = deleteAllPokemon((req as IRequestAuth).userAuth.id);
      const result = await execute();
      debug('Succesfull delete all pokemon: %j', result);
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
  },
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start get pokemon by id: %s', req.params.id);
      const { execute } = getByIdPokemon(
        req.params.id,
        (req as IRequestAuth).userAuth.id
      );
      const result = await execute();
      debug('Succesfull get pokemon by id: %j', result);
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
  getAll: async (_req: Request, res: Response): Promise<void> => {
    try {
      debug('Start get all pokemon');
      const { execute } = getAllPublicPokemon();
      const result = await execute();
      debug('Succesfull get all pokemon:', result);
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
  getMeAll: async (req: Request, res: Response): Promise<void> => {
    try {
      debug('Start get me pokemon: %s', (req as IRequestAuth).userAuth.id);
      const { execute } = getMeAllPokemon((req as IRequestAuth).userAuth.id);
      const result = await execute();
      debug('Succesfull get me pokemon: %j', result);
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
  }
};
