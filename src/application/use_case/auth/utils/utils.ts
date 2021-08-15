import { Profile } from '../../../../domain/models/profile';
import { IProfileCreateArgs } from '../../../../domain/repository/profile-repository';
import { generateToken } from '../../../../infrastructure/lib/jwt';

export type ResponseAuth = Omit<IProfileCreateArgs, 'password'> & {
  token: string;
};

export const createToken = (profile: Profile): string => {
  return generateToken({
    id: profile.id,
    email: profile.email
  });
};
