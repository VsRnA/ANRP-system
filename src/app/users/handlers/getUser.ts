import { httpTransport } from '#Infrastructure/fastify';
import { getUserSchema } from '../schemas/getUser';
import { find as findUser } from '../repositories/find';
import { plainify } from '#Lib/database/sequelize';

httpTransport.handler.get('/api/user/v1/:guid', getUserSchema, async (request) => {
  const { guid } = request.params;

  const user = await findUser({ guid });

  const plainUser = await plainify(user);

  return { data: plainUser };
}, { authOnly: false });
