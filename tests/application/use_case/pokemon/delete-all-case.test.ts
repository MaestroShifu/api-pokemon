import { mocked } from 'ts-jest/utils';
import { deleteAllPokemon } from '../../../../src/application/use_case/pokemon/delete-all-case';
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

describe('Delete all case pokemon', () => {
  afterEach(() => {
    jest.resetAllMocks();
    mocked(pokemonRepository.findByIdProfile).mockClear();
    mocked(pokemonRepository.deleteAllByProfile).mockClear();
  });

  it('Successful delete all pokemons', async () => {
    mocked(pokemonRepository.findByIdProfile).mockResolvedValue(pokemons);
    mocked(pokemonRepository.deleteAllByProfile).mockResolvedValue(true);
    const { execute } = deleteAllPokemon('2');
    const data = await execute();
    expect(data).toEqual(true);
    expect(pokemonRepository.findByIdProfile).toHaveBeenCalled();
    expect(pokemonRepository.deleteAllByProfile).toHaveBeenCalled();
  });

  it('You dont have pokemon', async () => {
    try {
      mocked(pokemonRepository.findByIdProfile).mockResolvedValue([]);
      const { execute } = deleteAllPokemon('2');
      await execute();
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.message).toEqual('You dont have pokemon!');
    }
    expect(pokemonRepository.findByIdProfile).toHaveBeenCalled();
  });
});
