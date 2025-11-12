import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { AppError, UnauthorizedError } from '#Lib/errors';
import { get as getUser } from '#App/users/repositories/get';
import { verifyJwt } from '#Shared/jwt';

export async function authHook(
  request: FastifyRequest,
  _reply: FastifyReply,
  done: HookHandlerDoneFunction
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedError('Authorization header is missing');
    }
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'JWT' || !token) {
      throw new UnauthorizedError('Invalid authorization header format. Expected: JWT <token>');
    }
    const decoded = verifyJwt(token);
    const user = await getUser({ guid: decoded.userGuid });
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    request.context.user = user;
    done();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    throw new AppError('Authentication failed');
  }
}
