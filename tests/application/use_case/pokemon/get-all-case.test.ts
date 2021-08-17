import { mocked } from 'ts-jest/utils';
import { getAllPublicPokemon } from '../../../../src/application/use_case/pokemon/get-all-case';
import { Pokemon } from '../../../../src/domain/models/pokemon';
import { pokemonRepository } from '../../../../src/domain/repository/pokemon-repository';

jest.mock('../../../../src/domain/repository/pokemon-repository');

const pokemons = [
  {
    id: 1,
    name: 'pikachu dos',
    ability: 'Electricidad estatica',
    is_public: true,
    url_image: null,
    profile_id: 1,
    types: [
      {
        id: 5,
        name: 'Electrico'
      },
      {
        id: 18,
        name: 'Volador'
      }
    ]
  },
  {
    id: 2,
    name: 'pikachu dos',
    ability: 'Electricidad estatica',
    is_public: true,
    url_image: null,
    profile_id: 1,
    types: [
      {
        id: 5,
        name: 'Electrico'
      },
      {
        id: 18,
        name: 'Volador'
      }
    ]
  }
] as unknown as Pokemon[];

describe('Get all case pokemons', () => {
  afterEach(() => {
    jest.resetAllMocks();
    mocked(pokemonRepository.getPublicPokemon).mockClear();
  });

  it('Successful get all pokemons', async () => {
    mocked(pokemonRepository.getPublicPokemon).mockResolvedValue(pokemons);
    const { execute } = getAllPublicPokemon();
    const data = await execute();
    expect(data[0].id).toEqual(1);
    expect(data[1].id).toEqual(2);
    expect(data[0].is_public).toEqual(true);
    expect(data[1].is_public).toEqual(true);
    expect(pokemonRepository.getPublicPokemon).toHaveBeenCalled();
  });
});
