import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const ListTypesPokemon = [
    { name: 'Acero' },
    { name: 'Agua' },
    { name: 'Bicho' },
    { name: 'Dragón' },
    { name: 'Eléctrico' },
    { name: 'Fantasma' },
    { name: 'Fuego' },
    { name: 'Hada' },
    { name: 'Hielo' },
    { name: 'Lucha' },
    { name: 'Normal' },
    { name: 'Planta' },
    { name: 'Psíquico' },
    { name: 'Roca' },
    { name: 'Siniestro' },
    { name: 'Tierra' },
    { name: 'Veneno' },
    { name: 'Volador' },
    { name: '???' }
  ];

  await knex('types').insert(ListTypesPokemon);
}
