import { httpTransport } from '#Infrastructure/fastify';
import { CreateSchema } from '../schemas/create';
import { create as createUser } from '../repositories/create';
import { get as getUser } from '../repositories/get';
import { find as findUserRole } from '#App/userRoles/repositories/find';
import { create as createUserRoleAssignment } from '#App/userRoleAssignments/repositories/create';
import { find as findUser } from '../repositories/find';
import { hashPassword } from '#Shared/password';
import { EntityAlreadyExistedError } from '#Lib/errors';
import db from '#Infrastructure/sequelize';

httpTransport.handler.post('/api/user/v1', CreateSchema, async (request) => {
  const { email, password, firstName, lastName, roleId } = request.payload;

  const existingUser = await getUser({ email });
  if (existingUser) {
    throw new EntityAlreadyExistedError('User', { email });
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.runInTransaction(async (transaction) => {
    const repOptions = { transaction }

    await findUserRole({ id: roleId }, repOptions);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    }, repOptions);

    await createUserRoleAssignment({
      userGuid: newUser.guid,
      roleId: roleId,
    }, repOptions);

    const userWithRoles = await findUser({ guid: newUser.guid }, repOptions);

    return userWithRoles;
  });

  return { data: user };
}, { authOnly: false });
