import { mocked } from 'ts-jest/utils';
import { registerProfile } from '../../../../src/application/use_case/auth/register-case';
import { Profile } from '../../../../src/domain/models/profile';
import {
  IProfileCreateArgs,
  profileRepository
} from '../../../../src/domain/repository/profile-repository';

jest.mock('../../../../src/domain/repository/profile-repository');

const args: IProfileCreateArgs = {
  email: 'sdanielsarsantos@gmail.com',
  password: 'password123'
};

const profile = {
  id: '1',
  email: args.email,
  name: undefined,
  last_name: undefined,
  password: args.password
} as Profile;

describe('Register case', () => {
  afterAll(() => {
    jest.resetAllMocks();
    mocked(profileRepository.findByEmail).mockClear();
    mocked(profileRepository.create).mockClear();
  });

  it('Successful register profile', async () => {
    mocked(profileRepository.findByEmail).mockResolvedValue(undefined);
    mocked(profileRepository.create).mockResolvedValue(profile);
    const { execute } = registerProfile(args);
    const data = await execute();
    expect(data.email).toEqual(args.email);
    expect(profileRepository.findByEmail).toHaveBeenCalled();
    expect(profileRepository.create).toHaveBeenCalled();
  });

  it('Failed register profile by email already exists', async () => {
    mocked(profileRepository.findByEmail).mockResolvedValue(profile);
    const { execute } = registerProfile(args);
    try {
      await execute();
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.message).toEqual('This registered email already exists!');
    }
    expect(profileRepository.findByEmail).toHaveBeenCalled();
  });
});
