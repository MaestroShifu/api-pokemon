import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('profiles', (table) => {
    table.increments('id').unique().primary();
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.string('last_name').notNullable();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchemaIfExists('profiles');
}
