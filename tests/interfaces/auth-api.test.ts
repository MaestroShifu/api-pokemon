/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { Profile } from '../../src/domain/models/profile';
import { app } from '../../src/infrastructure/server/app';

jest.mock('../../src/domain/models/profile');

const profile = {
  id: '1',
  email: 'sdanielsarsantos@gmail.com',
  name: undefined,
  last_name: undefined,
  password: '$2a$10$JF107YLWzNCXFsQbiF1U5.QemmqIBgwwem.4MLIRuGagd6Folu87C'
} as Profile;

describe('Authentication api', () => {
  afterEach(() => {
    jest.resetAllMocks();
    mocked(Profile.query).mockClear();
  });

  describe('Register endpoint', () => {
    it('Complete information is not sent', (done) => {
      request(app).post('/auth/register').expect(400, done);
    });

    it('email sent is invalid', (done) => {
      request(app)
        .post('/auth/register')
        .send({
          email: 'sdanielsarsantosgmail.com',
          password: 'Daniel19Santos@',
          re_password: 'Daniel19Santos@'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual('Invalid email');
          done();
        });
    });

    it('password sent is invalid', (done) => {
      request(app)
        .post('/auth/register')
        .send({
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos',
          re_password: 'Daniel19Santos@'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            'Invalid password, it must have an uppercase letter, it must have a lowercase letter and any of these characters !, @, #, ? or ]'
          );
          done();
        });
    });

    it('Passwords are different', (done) => {
      request(app)
        .post('/auth/register')
        .send({
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos@',
          re_password: 'Daniel19Santos'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual('Passwords do not match');
          done();
        });
    });

    it('Fields are not just letters', (done) => {
      request(app)
        .post('/auth/register')
        .send({
          name: 'prubea 12',
          last_name: 'santos',
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos@',
          re_password: 'Daniel19Santos@'
        })
        .expect(400, done);
      request(app)
        .post('/auth/register')
        .send({
          name: 'pruba',
          last_name: 'santos 19',
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos@',
          re_password: 'Daniel19Santos@'
        })
        .expect(400, done);
    });

    it('Internal server error', (done) => {
      mocked(Profile.query).mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockRejectedValue(new Error())
        })
      } as any);

      request(app)
        .post('/auth/register')
        .send({
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos@',
          re_password: 'Daniel19Santos@'
        })
        .expect(500)
        .then((res) => {
          expect(res.body.message).toEqual(
            'Upps and error... try again later!'
          );
          expect(Profile.query).toHaveBeenCalled();
          done();
        });
    });

    it('Succesfull register profile', (done) => {
      mocked(Profile.query).mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(undefined)
        }),
        insertAndFetch: jest.fn().mockResolvedValue(profile)
      } as any);

      request(app)
        .post('/auth/register')
        .send({
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos@',
          re_password: 'Daniel19Santos@'
        })
        .expect(201)
        .then((res) => {
          expect(res.body.email).toEqual('sdanielsarsantos@gmail.com');
          expect(Profile.query).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('Login endpoint', () => {
    it('Complete information is not sent', (done) => {
      request(app).post('/auth/login').expect(400, done);
    });

    it('email sent is invalid', (done) => {
      request(app)
        .post('/auth/login')
        .send({
          email: 'sdanielsarsantosgmail.com',
          password: 'Daniel19Santos@'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual('Invalid email');
          done();
        });
    });

    it('password sent is invalid', (done) => {
      request(app)
        .post('/auth/login')
        .send({
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual(
            'Invalid password, it must have an uppercase letter, it must have a lowercase letter and any of these characters !, @, #, ? or ]'
          );
          done();
        });
    });

    it('Internal server error', (done) => {
      mocked(Profile.query).mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockRejectedValue(new Error())
        })
      } as any);

      request(app)
        .post('/auth/login')
        .send({
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos@'
        })
        .expect(500)
        .then((res) => {
          expect(res.body.message).toEqual(
            'Upps and error... try again later!'
          );
          expect(Profile.query).toHaveBeenCalled();
          done();
        });
    });

    it('Succesfull login profile', (done) => {
      mocked(Profile.query).mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(profile)
        })
      } as any);

      request(app)
        .post('/auth/login')
        .send({
          email: 'sdanielsarsantos@gmail.com',
          password: 'Daniel19Santos@'
        })
        .expect(201)
        .then((res) => {
          expect(res.body.email).toEqual('sdanielsarsantos@gmail.com');
          expect(Profile.query).toHaveBeenCalled();
          done();
        });
    });
  });
});
