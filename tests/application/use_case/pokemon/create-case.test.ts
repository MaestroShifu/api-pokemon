import { mocked } from 'ts-jest/utils';
import { createPokemon } from '../../../../src/application/use_case/pokemon/create-case';
import { Pokemon } from '../../../../src/domain/models/pokemon';
import { pokemonRepository } from '../../../../src/domain/repository/pokemon-repository';

jest.mock('../../../../src/domain/repository/pokemon-repository');

const pokemon = {
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
} as unknown as Pokemon;

const argsCreate = {
  name: 'pikachu cuatro',
  ability: 'Electricidad estatica',
  types: ['Electrico', 'Volador']
};

describe('Create case pokemon', () => {
  afterAll(() => {
    jest.resetAllMocks();
    mocked(pokemonRepository.create).mockClear();
  });

  it('Successful create pokemon', async () => {
    mocked(pokemonRepository.create).mockResolvedValue(pokemon);
    const { execute } = createPokemon(argsCreate);
    const data = await execute();
    expect(pokemonRepository.create).toHaveBeenCalled();
    expect(data.name).toEqual('pikachu dos');
    expect(data.ability).toEqual('Electricidad estatica');
  });
});
