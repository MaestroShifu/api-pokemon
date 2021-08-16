import { Type } from '../models/type';

export const typeRepository = {
  findByNames: async (names: string[]): Promise<Type[]> => {
    const typeQuerys = names.map((tp) =>
      Type.query().where('name', tp).first()
    );
    const types = await Promise.all(typeQuerys);
    return types.filter((tp) => tp !== undefined) || [];
  }
};
