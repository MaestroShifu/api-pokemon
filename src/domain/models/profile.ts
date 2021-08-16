import { Model } from 'objection';
import { Pokemon } from './pokemon';

export class Profile extends Model {
  static tableName = 'profiles';
  static idColumn = 'id';

  static relationMappings = {
    pokemons: {
      relation: Model.HasManyRelation,
      modelClass: Pokemon,
      join: {
        from: 'profiles.id',
        to: 'pokemons.profile_id'
      }
    }
  };

  readonly id!: string;
  email!: string;
  name?: string;
  last_name?: string;
  password!: string;
  pokemons?: Pokemon[];
}
