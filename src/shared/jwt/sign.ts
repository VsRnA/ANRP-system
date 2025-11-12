import jwt from 'jsonwebtoken';
import { config } from '#Shared/config';
import { JwtPayload } from './types';


export function signJwt(payload: JwtPayload): string {
  const { secret } = config.jwt;

  return jwt.sign(payload, secret, {
    expiresIn: '7d', 
  });
}
