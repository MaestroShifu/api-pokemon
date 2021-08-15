import { Profile } from '../../../domain/models/profile';
import {
  IPorfileLoginArgs,
  profileRepository
} from '../../../domain/repository/profile-repository';
import { compareHash } from '../../../infrastructure/lib/bycript';
import { IUseCase } from '../../utils/IUserCase';
import { createToken, ResponseAuth } from './utils/utils';

export const loginProfile = (
  args: IPorfileLoginArgs
): IUseCase<Promise<ResponseAuth>> => {
  const isExistEmail = async (email: string): Promise<Profile> => {
    const profile = await profileRepository.findByEmail(email);
    if (profile) {
      return profile;
    }
    throw {
      statusCode: 400,
      message: 'Invalid email!'
    };
  };

  const validatePassword = (profile: Profile, password: string) => {
    if (!compareHash(profile.password, password)) {
      throw {
        statusCode: 400,
        message: 'Invalid password!'
      };
    }
  };

  const execute = async () => {
    const profile = await isExistEmail(args.email);
    validatePassword(profile, args.password);
    const token = createToken(profile);
    return {
      email: profile.email,
      name: profile.name,
      last_name: profile.last_name,
      token
    };
  };

  return {
    execute
  };
};
