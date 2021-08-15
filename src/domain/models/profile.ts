import { Model } from 'objection';

export class Profile extends Model {
  static tableName = 'profiles';
  static idColumn = 'id';

  static relationMappings = {};

  readonly id!: string;
  email!: string;
  name?: string;
  last_name?: string;
  password!: string;
}
