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
  const isOwnerPokemon = async (idPokemon: string, idProfile: string) => {
    const pokemon = await pokemonRepository.findById(idPokemon);
    if (pokemon) {
      if (pokemon.profile_id === idProfile) {
        return;
      }
      throw {
        statusCode: 400,
        message: 'Invalid pokemon!'
      };
    }
    throw {
      statusCode: 400,
      message: 'Pokemon no exist!'
    };
  };

  const execute = async () => {
    await isOwnerPokemon(id, args.profile_id);
    const pokemon = await pokemonRepository.update(id, args);
    return pokemon;
  };

  return {
    execute
  };
};
