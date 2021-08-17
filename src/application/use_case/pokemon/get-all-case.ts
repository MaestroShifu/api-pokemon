import { Pokemon } from '../../../domain/models/pokemon';
import { pokemonRepository } from '../../../domain/repository/pokemon-repository';
import { IUseCase } from '../../utils/IUserCase';

export const getAllPublicPokemon = (): IUseCase<Promise<Pokemon[]>> => {
  const execute = async () => {
    const pokemons = await pokemonRepository.getPublicPokemon();
    return pokemons;
  };

  return {
    execute
  };
};
