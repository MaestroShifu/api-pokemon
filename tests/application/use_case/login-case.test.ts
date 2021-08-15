import { mocked } from 'ts-jest/utils';
import { loginProfile } from '../../../src/application/use_case/auth/login-case';
import { Profile } from '../../../src/domain/models/profile';
import {
  IPorfileLoginArgs,
  profileRepository
} from '../../../src/domain/repository/profile-repository';

jest.mock('../../../src/domain/repository/profile-repository');

const args: IPorfileLoginArgs = {
  email: 'sdanielsarsantos@gmail.com',
  password: 'Daniel19Santos@'
};

const profile = {
  id: '1',
  email: args.email,
  name: undefined,
  last_name: undefined,
  password: '$2a$10$JF107YLWzNCXFsQbiF1U5.QemmqIBgwwem.4MLIRuGagd6Folu87C'
} as Profile;

describe('Login case', () => {
  afterAll(() => {
    jest.resetAllMocks();
    mocked(profileRepository.findByEmail).mockClear();
  });

  it('Successful login profile', async () => {
    mocked(profileRepository.findByEmail).mockResolvedValue(profile);
    const { execute } = loginProfile(args);
    const data = await execute();
    expect(data.email).toEqual(args.email);
    expect(profileRepository.findByEmail).toHaveBeenCalled();
  });

  it('Failed login profile by invalid email', async () => {
    mocked(profileRepository.findByEmail).mockResolvedValue(undefined);
    try {
      const { execute } = loginProfile(args);
      await execute();
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.message).toEqual('Invalid email!');
    }
    expect(profileRepository.findByEmail).toHaveBeenCalled();
  });

  it('Failed login profile by Invalid password', async () => {
    mocked(profileRepository.findByEmail).mockResolvedValue(profile);
    try {
      const { execute } = loginProfile({
        ...args,
        password: '1234'
      });
      await execute();
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.message).toEqual('Invalid password!');
    }
    expect(profileRepository.findByEmail).toHaveBeenCalled();
  });
});
