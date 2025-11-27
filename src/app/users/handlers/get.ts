import { httpTransport } from '#Infrastructure/fastify';
import { GetSchema } from '../schemas/get';
import { find as findUser } from '../repositories/find';

httpTransport.handler.get('/api/user/v1/:guid', GetSchema, async (request) => {
  const user = await findUser(request.params);
  return { data: user };
}, { authOnly: false });
