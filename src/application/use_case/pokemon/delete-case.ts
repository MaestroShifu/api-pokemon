import { pokemonRepository } from '../../../domain/repository/pokemon-repository';
import { IUseCase } from '../../utils/IUserCase';

export const deletePokemon = (id: string): IUseCase<Promise<boolean>> => {
  const execute = async () => {
    //validar que exista
    //validar que pertenezca al usuario
    const pokemon = await pokemonRepository.delete(id);
    return pokemon;
  };

  return {
    execute
  };
};
