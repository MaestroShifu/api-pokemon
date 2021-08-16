import { Pokemon } from '../../../domain/models/pokemon';
import {
  IUpdatePokemonArgs,
  pokemonRepository
} from '../../../domain/repository/pokemon-repository';
import { IUseCase } from '../../utils/IUserCase';

export const updatePokemon = (
  args: IUpdatePokemonArgs,
  id: string
): IUseCase<Promise<Pokemon>> => {
  const execute = async () => {
    const pokemon = await pokemonRepository.update(id, args);
    return pokemon;
  };

  return {
    execute
  };
};
