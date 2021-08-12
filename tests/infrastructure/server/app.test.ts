import { Express } from 'express';
import { startServer } from '../../../src/infrastructure/server/app';

describe('Start server', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Start server successful', (done) => {
    const listenMock = jest.fn((_port, callback) => callback());
    const app: unknown = {
      listen: listenMock
    };
    const start = startServer(app as Express, 3000);
    start();
    expect(listenMock).toHaveBeenCalledWith(3000, expect.anything());
    expect(listenMock).toHaveBeenCalled();
    done();
  });
});
