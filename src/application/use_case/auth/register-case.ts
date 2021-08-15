import {
  IProfileCreateArgs,
  profileRepository
} from '../../../domain/repository/profile-repository';
import { generateHash } from '../../../infrastructure/lib/bycript';
import { IUseCase } from '../../utils/IUserCase';
import { createToken, ResponseAuth } from './utils/utils';

export const registerProfile = (
  args: IProfileCreateArgs
): IUseCase<Promise<ResponseAuth>> => {
  const isExistEmail = async (email: string) => {
    const profile = await profileRepository.findByEmail(email);
    if (!profile) {
      return;
    }
    throw {
      statusCode: 400,
      message: 'This registered email already exists!'
    };
  };

  const passwordToHash = (password: string) => {
    return generateHash(password);
  };

  const execute = async () => {
    await isExistEmail(args.email);
    const password = passwordToHash(args.password);
    const profile = await profileRepository.create({
      email: args.email,
      name: args.name,
      last_name: args.last_name,
      password
    });
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
