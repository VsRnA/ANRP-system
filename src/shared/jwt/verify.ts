import jwt from 'jsonwebtoken';
import { config } from '#Shared/config';
import { UnauthorizedError } from '#Lib/errors';
import { JwtPayload } from './types';


export function verifyJwt(token: string): JwtPayload {
  const { secret } = config.jwt;

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }
    throw new UnauthorizedError('Token verification failed');
  }
}
