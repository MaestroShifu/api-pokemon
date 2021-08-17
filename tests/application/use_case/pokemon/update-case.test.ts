import { mocked } from 'ts-jest/utils';
import { updatePokemon } from '../../../../src/application/use_case/pokemon/update-case';
import { Pokemon } from '../../../../src/domain/models/pokemon';
import {
  IUpdatePokemonArgs,
  pokemonRepository
} from '../../../../src/domain/repository/pokemon-repository';

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

const argsUpdate: IUpdatePokemonArgs = {
  name: 'pikachu',
  ability: 'Electricidad estatica',
  is_public: false,
  url_image:
    'https://static.wikia.nocookie.net/espokemon/images/7/77/Pikachu.png/revision/latest?cb=20150621181250',
  add_types: ['Electrico', 'Volador'],
  remove_types: ['Electrico', 'Volador'],
  profile_id: '1'
};

describe('Update case pokemon', () => {
  afterEach(() => {
    jest.resetAllMocks();
    mocked(pokemonRepository.findById).mockClear();
  });

  it('Successful update pokemon', async () => {
    mocked(pokemonRepository.findById).mockResolvedValue(pokemon);
    mocked(pokemonRepository.update).mockResolvedValue(pokemon);
    const { execute } = updatePokemon(argsUpdate, '1');
    const data = await execute();
    expect(data.name).toEqual('pikachu dos');
    expect(data.ability).toEqual('Electricidad estatica');
    expect(pokemonRepository.findById).toHaveBeenCalled();
    expect(pokemonRepository.update).toHaveBeenCalled();
  });

  it('Invalid pokemon', async () => {
    mocked(pokemonRepository.findById).mockResolvedValue(pokemon);
    try {
      const { execute } = updatePokemon(argsUpdate, '1');
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
      const { execute } = updatePokemon(argsUpdate, '1');
      await execute();
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.message).toEqual('Pokemon no exist!');
    }
    expect(pokemonRepository.findById).toHaveBeenCalled();
  });
});
