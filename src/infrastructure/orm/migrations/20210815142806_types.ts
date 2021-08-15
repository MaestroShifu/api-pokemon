import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('types', (table) => {
    table.increments('id').unique().primary();
    table.string('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('types');
}
