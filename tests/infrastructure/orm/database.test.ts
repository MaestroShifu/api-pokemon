import Knex from 'knex';
import { Model } from 'objection';
import { mocked } from 'ts-jest/utils';
import { startDataBase } from '../../../src/infrastructure/orm/database';

jest.mock('knex');
jest.mock('objection');

describe.only('Start database', () => {
  afterAll(() => {
    jest.resetAllMocks();
    mocked(Knex).mockClear();
  });

  it('Start database successful', async () => {
    const rawMock = jest.fn(() => Promise.resolve());
    mocked(Knex).mockImplementation((): any => {
      return {
        raw: rawMock
      };
    });
    const valid = await startDataBase();
    expect(rawMock).toHaveBeenCalledTimes(2);
    expect(Model.knex).toHaveBeenCalled();
    expect(Knex).toHaveBeenCalled();
    expect(valid).toEqual(true);
  });

  it('Start database failed', async () => {
    const rawMock = jest.fn(() => Promise.reject());
    mocked(Knex).mockImplementation((): any => {
      return {
        raw: rawMock
      };
    });
    const valid = await startDataBase();
    expect(rawMock).toHaveBeenCalledTimes(1);
    expect(Knex).toHaveBeenCalled();
    expect(valid).toEqual(false);
  });
});
