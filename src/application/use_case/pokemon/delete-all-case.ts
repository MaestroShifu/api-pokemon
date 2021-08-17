import { pokemonRepository } from '../../../domain/repository/pokemon-repository';
import { IUseCase } from '../../utils/IUserCase';

export const deleteAllPokemon = (
  idProfile: string
): IUseCase<Promise<boolean>> => {
  const toHavePokemons = async (id: string) => {
    const pokemons = await pokemonRepository.findByIdProfile(id);
    if (pokemons.length > 0) {
      return;
    }
    throw {
      statusCode: 400,
      message: 'You dont have pokemon!'
    };
  };

  const execute = async () => {
    await toHavePokemons(idProfile);
    const result = await pokemonRepository.deleteAllByProfile(idProfile);
    return result;
  };

  return {
    execute
  };
};
