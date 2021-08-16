import { Pokemon } from '../models/pokemon';
import { typeRepository } from './type-repository';

export interface ICreatePokemonArgs {
  name: string;
  ability: string;
  is_public?: boolean;
  url_image?: string;
  profile_id?: string;
  types: string[];
}

export type IUpdatePokemonArgs = Omit<
  ICreatePokemonArgs,
  'name' | 'ability' | 'types'
> & {
  name?: string;
  ability?: string;
  add_types?: string[];
  remove_types?: string[];
};

export const pokemonRepository = {
  findById: async (id: string): Promise<Pokemon> => {
    const pokemon = Pokemon.query().findById(id).withGraphFetched('types');
    return pokemon;
  },
  create: async (args: ICreatePokemonArgs): Promise<Pokemon> => {
    const types = await typeRepository.findByNames(args.types);
    const pokemon = await Pokemon.query().insertAndFetch({
      name: args.name,
      ability: args.ability,
      is_public: args.is_public,
      url_image: args.url_image,
      profile_id: args.profile_id
    });
    await pokemon.addType(types);
    pokemon.types = [...types];
    return pokemon;
  },
  update: async (id: string, args: IUpdatePokemonArgs): Promise<Pokemon> => {
    const pokemon = await Pokemon.query().updateAndFetchById(id, {
      name: args.name,
      ability: args.ability,
      is_public: args.is_public,
      url_image: args.url_image,
      profile_id: args.profile_id
    });
    const addTypes = await typeRepository.findByNames(args.add_types || []);
    await pokemon.validAddTypes(addTypes);
    const removeTypes = await typeRepository.findByNames(
      args.remove_types || []
    );
    await pokemon.validRemoveTypes(removeTypes);
    const types = await pokemon.$relatedQuery('types');
    pokemon.types = types;
    return pokemon;
  },
  delete: async (id: string): Promise<boolean> => {
    await Pokemon.query().deleteById(id);
    return true;
  }
};
