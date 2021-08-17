import { Pokemon } from '../../../domain/models/pokemon';
import { pokemonRepository } from '../../../domain/repository/pokemon-repository';
import { IUseCase } from '../../utils/IUserCase';

export const getMeAllPokemon = (
  idProfile: string
): IUseCase<Promise<Pokemon[]>> => {
  const execute = async () => {
    const pokemons = await pokemonRepository.findByIdProfile(idProfile);
    return pokemons;
  };

  return {
    execute
  };
};
