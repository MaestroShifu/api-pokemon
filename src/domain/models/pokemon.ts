import { Model } from 'objection';
import { Type } from './type';

export class Pokemon extends Model {
  static tableName = 'pokemons';
  static idColumn = 'id';

  static relationMappings = {
    types: {
      relation: Model.ManyToManyRelation,
      modelClass: Type,
      join: {
        from: 'pokemons.id',
        through: {
          from: 'pokemon_type.pokemon_id',
          to: 'pokemon_type.type_id'
        },
        to: 'types.id'
      }
    }
  };

  readonly id!: string;
  name!: string;
  ability!: string;
  is_public!: boolean;
  url_image?: string;
  profile_id?: string;
  types?: Type[];

  public async validAddTypes(types: Type[]): Promise<number> {
    const dataTypes = await this.$relatedQuery('types');
    if (dataTypes.length === 0) {
      return this.addType(types);
    }
    const validTypes = types.filter((tp) => {
      return !dataTypes.find((t) => t.id === tp.id);
    });
    if (validTypes.length > 0) {
      return this.addType(validTypes);
    }
    return 0;
  }

  public async validRemoveTypes(types: Type[]): Promise<number> {
    const dataTypes = await this.$relatedQuery('types');
    if (dataTypes.length === 0) {
      return 0;
    }
    const validTypes = types.filter((tp) => {
      return dataTypes.find((t) => t.id === tp.id);
    });
    if (validTypes.length > 0) {
      const removeTypes = validTypes.map((vtp) => this.removeType(vtp));
      const numberUnRelated = await Promise.all(removeTypes);
      return numberUnRelated.reduce((a, b) => a + b, 0);
    }
    return 0;
  }

  public async addType(types: Type[]): Promise<number> {
    const numRelatedRows = await this.$relatedQuery('types').relate(types);
    return numRelatedRows;
  }

  public async removeType(type: Type): Promise<number> {
    const numUnRelatedRows = await this.$relatedQuery('types')
      .unrelate()
      .where('id', type.id);
    return numUnRelatedRows;
  }
}
