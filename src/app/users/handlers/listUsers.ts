import { httpTransport } from '#Infrastructure/fastify';
import { listUsersSchema } from '../schemas/listUsers';
import { list as listUsers } from '../repositories/list';
import { plainify } from '#Lib/database/sequelize';

httpTransport.handler.get('/api/user/v1/list', listUsersSchema, async (request) => {
  const { email, firstName, lastName, limit, offset } = request.query;

  const users = await listUsers({
    email,
    firstName,
    lastName,
    limit,
    offset,
  });

  const plainUsers = await plainify(users);

  return { data: plainUsers };
}, { authOnly: false });
