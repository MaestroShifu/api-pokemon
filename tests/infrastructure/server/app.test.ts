import { Express } from 'express';
import { mocked } from 'ts-jest/utils';
import { startDataBase } from '../../../src/infrastructure/orm/database';
import { startServer } from '../../../src/infrastructure/server/app';

jest.mock('../../../src/infrastructure/orm/database', () => {
  return {
    startDataBase: jest.fn()
  };
});

describe('Start server', () => {
  afterAll(() => {
    jest.resetAllMocks();
    mocked(startDataBase).mockClear();
  });

  it('Start server successful', async () => {
    mocked(startDataBase).mockImplementation(
      (): Promise<boolean> => Promise.resolve(true)
    );
    const listenMock = jest.fn((_port, callback) => callback());
    const app: unknown = {
      listen: listenMock
    };
    const start = startServer(app as Express, 3000);
    await start();
    expect(startDataBase).toHaveBeenCalled();
    expect(listenMock).toHaveBeenCalledWith(3000, expect.anything());
    expect(listenMock).toHaveBeenCalled();
  });
});
