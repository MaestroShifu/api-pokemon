import { Pokemon } from '../../../domain/models/pokemon';
import {
  ICreatePokemonArgs,
  pokemonRepository
} from '../../../domain/repository/pokemon-repository';
import { IUseCase } from '../../utils/IUserCase';

export const createPokemon = (
  args: ICreatePokemonArgs
): IUseCase<Promise<Pokemon>> => {
  const execute = async () => {
    const pokemon = await pokemonRepository.create(args);
    return pokemon;
  };

  return {
    execute
  };
};
