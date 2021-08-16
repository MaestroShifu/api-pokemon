import { Model } from 'objection';

export class Type extends Model {
  static tableName = 'types';
  static idColumn = 'id';

  static relationMappings = {};

  readonly id!: string;
  name!: string;
}
