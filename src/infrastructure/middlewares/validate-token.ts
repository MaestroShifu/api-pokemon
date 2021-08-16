import { Request, Response, NextFunction } from 'express';
import { verifyToken, IGenerateTokenArgs } from '../lib/jwt';

export type IRequestAuth = Request & { userAuth: IGenerateTokenArgs };

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers['x-access-token'];
    const payload = verifyToken(token as string);
    (req as IRequestAuth).userAuth = payload;
    next();
  } catch (error) {
    const result = {
      statusCode: 401,
      message: 'Invalid Token'
    };
    res.status(result.statusCode).send(result);
  }
};
