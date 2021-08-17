/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { Pokemon } from '../../src/domain/models/pokemon';
import { Type } from '../../src/domain/models/type';
import { generateToken } from '../../src/infrastructure/lib/jwt';
import { app } from '../../src/infrastructure/server/app';

jest.mock('../../src/domain/models/pokemon');
jest.mock('../../src/domain/models/type');

const createArgs = {
  name: 'pikachu cuatro',
  ability: 'Electricidad estatica',
  types: ['Electrico']
};

const updateArgs = {
  name: 'pikachu',
  ability: 'Electricidad estatica',
  is_public: false,
  url_image:
    'https://static.wikia.nocookie.net/espokemon/images/7/77/Pikachu.png/revision/latest?cb=20150621181250',
  add_types: ['Electrico', 'Volador'],
  remove_types: ['Electrico', 'Volador']
};

const token = generateToken({
  id: '1',
  email: 'sdanielsarsantos@gmail.com'
});

const type = {
  id: 5,
  name: 'Electrico'
} as unknown as Type;

const pokemon = {
  name: 'pikachu',
  ability: 'Electricidad estática',
  is_public: false,
  url_image:
    'https://static.wikia.nocookie.net/espokemon/images/7/77/Pikachu.png/revision/latest?cb=20150621181250',
  profile_id: '1',
  id: 9,
  addType: jest.fn().mockResolvedValue(1),
  validAddTypes: jest.fn().mockResolvedValue(1),
  validRemoveTypes: jest.fn().mockResolvedValue(1),
  $relatedQuery: jest.fn().mockResolvedValue([type] as Type[])
} as unknown as Pokemon;

describe('Pokemon api', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create pokemon', () => {
    it('Complete information is not sent', (done) => {
      request(app)
        .post('/pokemon')
        .set('x-access-token', token)
        .expect(400, done);
    });

    it('name sent is invalid', (done) => {
      request(app)
        .post('/pokemon')
        .set('x-access-token', token)
        .send({
          ...createArgs,
          name: 'asd12'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            `The name can only contain letters and don't use accents`
          );
          done();
        });
    });

    it('ability sent is invalid', (done) => {
      request(app)
        .post('/pokemon')
        .set('x-access-token', token)
        .send({
          ...createArgs,
          ability: 'asd12'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            `The ability can only contain letters and don't use accents`
          );
          done();
        });
    });

    it('Succesfull create pokemon', (done) => {
      mocked(Pokemon.query).mockReturnValue({
        insertAndFetch: jest.fn().mockResolvedValue(pokemon)
      } as any);

      mocked(Type.query).mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(type)
        })
      } as any);

      request(app)
        .post('/pokemon')
        .set('x-access-token', token)
        .send({
          ...createArgs
        })
        .expect(201)
        .then((res) => {
          expect(res.body.id).toEqual(pokemon.id);
          done();
        });
    });
  });

  describe('Update pokemon', () => {
    it('name sent is invalid', (done) => {
      request(app)
        .put('/pokemon/1')
        .set('x-access-token', token)
        .send({
          ...updateArgs,
          name: 'asd12'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            `The name can only contain letters and don't use accents`
          );
          done();
        });
    });

    it('ability sent is invalid', (done) => {
      request(app)
        .put('/pokemon/1')
        .set('x-access-token', token)
        .send({
          ...updateArgs,
          ability: 'asd12'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            `The ability can only contain letters and don't use accents`
          );
          done();
        });
    });

/*     it('Succesfull update pokemon', (done) => {
      mocked(Pokemon.query).mockReturnValue({
        withGraphFetched: jest.fn().mockResolvedValue({
          findById: jest.fn().mockResolvedValue(pokemon)
        }),
        updateAndFetchById: jest.fn().mockResolvedValue(pokemon)
      } as any);

      mocked(Type.query).mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(type)
        })
      } as any);

      request(app)
        .put('/pokemon/1')
        .set('x-access-token', token)
        .send({
          ...updateArgs
        })
        .expect(200)
        .then((res) => {
          expect(res.body.id).toEqual(pokemon.id);
          done();
        });
    }); */
  });

  /*   describe('Delete pokemon', () => {});
  describe('DeleteAll pokemon', () => {});
  describe('GetById pokemon', () => {});
  describe('GetAll pokemon', () => {});
  describe('GetMeAll pokemon', () => {}); */
});
