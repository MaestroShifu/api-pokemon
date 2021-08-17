import { mocked } from 'ts-jest/utils';
import { getByIdPokemon } from '../../../../src/application/use_case/pokemon/get-by-id-case';
import { Pokemon } from '../../../../src/domain/models/pokemon';
import { pokemonRepository } from '../../../../src/domain/repository/pokemon-repository';

jest.mock('../../../../src/domain/repository/pokemon-repository');

const pokemon = {
  id: '1',
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
} as unknown as Pokemon;

describe('Get by id case pokemon', () => {
  afterEach(() => {
    jest.resetAllMocks();
    mocked(pokemonRepository.findById).mockClear();
  });

  it('Successful get by id pokemon', async () => {
    mocked(pokemonRepository.findById).mockResolvedValue(pokemon);
    const { execute } = getByIdPokemon('1', '1');
    const data = await execute();
    expect(data.name).toEqual('pikachu dos');
    expect(data.ability).toEqual('Electricidad estatica');
    expect(pokemonRepository.findById).toHaveBeenCalled();
  });

  it('Invalid pokemon', async () => {
    mocked(pokemonRepository.findById).mockResolvedValue(pokemon);
    try {
      const { execute } = getByIdPokemon('1', '2');
      await execute();
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.message).toEqual('Invalid pokemon!');
    }
    expect(pokemonRepository.findById).toHaveBeenCalled();
  });

  it('Pokemon no exist', async () => {
    mocked(pokemonRepository.findById).mockResolvedValue(undefined);
    try {
      const { execute } = getByIdPokemon('1', '2');
      await execute();
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.message).toEqual('Pokemon no exist!');
    }
    expect(pokemonRepository.findById).toHaveBeenCalled();
  });
});
