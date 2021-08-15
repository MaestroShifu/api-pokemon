import { Profile } from '../models/profile';

export interface IProfileCreateArgs {
  email: string;
  name?: string;
  last_name?: string;
  password: string;
}

export interface IPorfileLoginArgs {
  email: string;
  password: string;
}

export const profileRepository = {
  findByEmail: async (email: string): Promise<Profile | undefined> => {
    const profile = await Profile.query().where('email', email).first();
    return profile;
  },
  create: (args: IProfileCreateArgs): Promise<Profile> => {
    return Profile.query().insertAndFetch(args);
  }
};
