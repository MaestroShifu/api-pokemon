import { mocked } from 'ts-jest/utils';
import { getMeAllPokemon } from '../../../../src/application/use_case/pokemon/get-me-all-case';
import { Pokemon } from '../../../../src/domain/models/pokemon';
import { pokemonRepository } from '../../../../src/domain/repository/pokemon-repository';

jest.mock('../../../../src/domain/repository/pokemon-repository');

const pokemons = [
  {
    id: 1,
    name: 'pikachu dos',
    ability: 'Electricidad estatica',
    is_public: false,
    url_image: null,
    profile_id: '1',
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
    profile_id: '1',
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

describe('Get me all case pokemons', () => {
  afterEach(() => {
    jest.resetAllMocks();
    mocked(pokemonRepository.findByIdProfile).mockClear();
  });

  it('Successful get me all pokemons', async () => {
    mocked(pokemonRepository.findByIdProfile).mockResolvedValue(pokemons);
    const { execute } = getMeAllPokemon('1');
    const data = await execute();
    expect(data[0].profile_id).toEqual('1');
    expect(data[1].profile_id).toEqual('1');
    expect(data[0].is_public).toEqual(false);
    expect(data[1].is_public).toEqual(true);
    expect(pokemonRepository.findByIdProfile).toHaveBeenCalled();
  });
});
