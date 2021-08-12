import {
  getEnviroment,
  Environment
} from '../../../src/infrastructure/config/config';

describe('Config Server', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Set default variables enviroments', (done) => {
    delete process.env.NODE_ENV;
    const config = getEnviroment();
    expect(config.ENV_NODE).toEqual(Environment.dev);
    expect(config.PORT).toEqual('5000');
    done();
  });

  it('Set developer variables enviroments', (done) => {
    process.env.NODE_ENV = Environment.dev;
    const config = getEnviroment();
    expect(config.ENV_NODE).toEqual(Environment.dev);
    done();
  });

  it('Set production variables enviroments', (done) => {
    process.env.NODE_ENV = Environment.prod;
    const config = getEnviroment();
    expect(config.ENV_NODE).toEqual(Environment.prod);
    done();
  });

  it('Set testing variables enviroments', (done) => {
    process.env.NODE_ENV = Environment.test;
    const config = getEnviroment();
    expect(config.ENV_NODE).toEqual(Environment.test);
    done();
  });
});
