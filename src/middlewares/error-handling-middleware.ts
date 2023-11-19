import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, RequestError } from '../protocols';

export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  if (err.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  if (err.name === 'BalanceUnauthorized') return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  if (err.name === 'BalanceInsufficient') return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  if (err.name === 'GameFinished') return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  if (err.hasOwnProperty('status') && err.name === 'RequestError')
    return res.status((err as RequestError).status).send({ message: err.message });
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
