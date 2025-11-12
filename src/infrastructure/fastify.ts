import { FastifyHttpTransport } from '#Lib/http/fastify';
import { config } from '#Shared/config';
import { authHook } from '#Infrastructure/hooks';

export const httpTransport = new FastifyHttpTransport({
  port: config.http.port,
  host: config.http.host,
  logger: config.logger,
});

httpTransport.hooks.registerGlobal('preHandler', 'auth', authHook);
