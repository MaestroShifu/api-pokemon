import { Pokemon } from '../../../../domain/models/pokemon';
import { pokemonRepository } from '../../../../domain/repository/pokemon-repository';

export const isOwnerPokemon = async (
  idPokemon: string,
  idProfile: string
): Promise<Pokemon> => {
  const pokemon = await pokemonRepository.findById(idPokemon);
  if (pokemon) {
    if (pokemon.profile_id === idProfile) {
      return pokemon;
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
