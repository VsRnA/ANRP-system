import jwt from 'jsonwebtoken';
import { JwtPayload } from './types';


export function decodeJwt(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}
