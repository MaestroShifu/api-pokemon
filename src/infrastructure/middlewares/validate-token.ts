import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../lib/jwt';

export type IRequestAuth = Request & { userAuth: JwtPayload | string };

export const validateToken = (
  req: IRequestAuth,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers['x-access-token'];
    const payload = verifyToken(token as string);
    req.userAuth = payload;
    next();
  } catch (error) {
    res.status(401).send('Invalid Token');
  }
};
