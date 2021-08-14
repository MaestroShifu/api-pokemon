/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { ValidationError } from 'express-openapi-validate';

const debug = createDebug('Server:ParserError');

export const parserFormatError = (
  err: ValidationError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const result = {
    statusCode: err.statusCode,
    message: err.message
  };
  debug('Internal error: %j', err.data);
  res.status(err.statusCode).send(result);
};
