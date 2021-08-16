import { Request } from 'express';
import {
  ICreatePokemonArgs,
  IUpdatePokemonArgs
} from '../../domain/repository/pokemon-repository';
import { validOnlyLetters } from './utils/validators';

export const createPokemonSerializers = (req: Request): ICreatePokemonArgs => {
  const name = validOnlyLetters(req.body.name, 'name');
  const ability = validOnlyLetters(req.body.ability, 'ability');
  const types = req.body.types;
  const is_public = req.body.is_public;
  const url_image = req.body.url_image;
  return {
    name,
    ability,
    types,
    is_public,
    url_image
  };
};

type IUpdatePokemonArgsModify = Omit<IUpdatePokemonArgs, 'profile_id'>;

export const updatePokemonSerializers = (
  req: Request
): IUpdatePokemonArgsModify => {
  const name = req.body.name
    ? validOnlyLetters(req.body.name, 'name')
    : undefined;
  const ability = req.body.ability
    ? validOnlyLetters(req.body.ability, 'ability')
    : undefined;
  const add_types = req.body.add_types;
  const remove_types = req.body.remove_types;
  const is_public = req.body.is_public;
  const url_image = req.body.url_image;
  return {
    name,
    ability,
    add_types,
    remove_types,
    is_public,
    url_image
  };
};
