import { httpTransport } from '#Infrastructure/fastify';
import { ListSchema } from '../schemas/list';
import { list as listUsers } from '../repositories/list';

httpTransport.handler.get('/api/user/v1/list', ListSchema, async (request) => {
  const users = await listUsers(request.query);
  return { data: users };
}, { authOnly: false });
