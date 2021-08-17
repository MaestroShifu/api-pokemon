import { Pokemon } from '../../../domain/models/pokemon';
import { IUseCase } from '../../utils/IUserCase';
import { isOwnerPokemon } from './utils/utils';

export const getByIdPokemon = (
  id: string,
  idProfile: string
): IUseCase<Promise<Pokemon>> => {
  const execute = async () => {
    const pokemon = await isOwnerPokemon(id, idProfile);
    return pokemon;
  };

  return {
    execute
  };
};
