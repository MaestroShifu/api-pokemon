import { pokemonRepository } from '../../../domain/repository/pokemon-repository';
import { IUseCase } from '../../utils/IUserCase';
import { isOwnerPokemon } from './utils/utils';

export const deletePokemon = (
  id: string,
  idProfile: string
): IUseCase<Promise<boolean>> => {
  const execute = async () => {
    await isOwnerPokemon(id, idProfile);
    const pokemon = await pokemonRepository.delete(id);
    return pokemon;
  };

  return {
    execute
  };
};
