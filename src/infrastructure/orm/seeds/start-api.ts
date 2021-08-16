import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const ListTypesPokemon = [
    { name: 'Acero' },
    { name: 'Agua' },
    { name: 'Bicho' },
    { name: 'Dragon' },
    { name: 'Electrico' },
    { name: 'Fantasma' },
    { name: 'Fuego' },
    { name: 'Hada' },
    { name: 'Hielo' },
    { name: 'Lucha' },
    { name: 'Normal' },
    { name: 'Planta' },
    { name: 'Psiquico' },
    { name: 'Roca' },
    { name: 'Siniestro' },
    { name: 'Tierra' },
    { name: 'Veneno' },
    { name: 'Volador' },
    { name: '???' }
  ];

  await knex('types').insert(ListTypesPokemon);
}
