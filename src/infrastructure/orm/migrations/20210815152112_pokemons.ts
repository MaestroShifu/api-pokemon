import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('pokemons', (table) => {
    table.increments('id').unique().primary();
    table.string('name').notNullable();
    table.string('ability').notNullable();
    table.boolean('is_public').defaultTo(true);
    table.string('url_image');
    table
      .integer('profile_id')
      .references('id')
      .inTable('profiles')
      .onDelete('SET NULL');
  });
  await knex.schema.createTable('pokemon_type', (table) => {
    table.integer('pokemon_id').references('id').inTable('pokemons');
    table.integer('type_id').references('id').inTable('types');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('pokemon_type');
  await knex.schema.dropSchemaIfExists('pokemons');
}
