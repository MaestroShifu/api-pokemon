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
  'name' | 'ability' | 'types' | 'profile_id'
> & {
  profile_id: string;
  name?: string;
  ability?: string;
  add_types?: string[];
  remove_types?: string[];
};

export const pokemonRepository = {
  getPublicPokemon: async (): Promise<Pokemon[]> => {
    const pokemons = await Pokemon.query()
      .where('is_public', true)
      .withGraphFetched('types');
    return pokemons;
  },
  findByIdProfile: async (id: string): Promise<Pokemon[]> => {
    const pokemons = await Pokemon.query()
      .where('profile_id', id)
      .withGraphFetched('types');
    return pokemons || [];
  },
  findById: async (id: string): Promise<Pokemon | undefined> => {
    const pokemon = await Pokemon.query()
      .withGraphFetched('types')
      .findById(id);
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
      url_image: args.url_image
    });
    const addTypes = await typeRepository.findByNames(args.add_types || []);
    await pokemon.validAddTypes(addTypes);
    const removeTypes = await typeRepository.findByNames(
      args.remove_types || []
    );
    await pokemon.validRemoveTypes(removeTypes);
    const types = await pokemon.$relatedQuery('types');
    pokemon.types = [...types];
    return pokemon;
  },
  delete: async (id: string): Promise<boolean> => {
    await Pokemon.query().deleteById(id);
    return true;
  },
  deleteAllByProfile: async (idProfile: string): Promise<boolean> => {
    await Pokemon.query().where('profile_id', idProfile).delete();
    return true;
  }
};
