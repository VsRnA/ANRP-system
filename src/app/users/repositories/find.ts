import User, { UserAttributes } from '#App/users/models/user.model';
import UserRole from '#App/userRoles/models/userRole.model';
import { WhereOptions, FindOptions } from 'sequelize';
import { NotFoundError } from '#Lib/errors';

interface FindUserFilters {
  guid?: string;
  email?: string;
  includePassword?: boolean;
}

export async function find(filters: FindUserFilters, repOptions?: FindOptions): Promise<User> {
  const where: WhereOptions<UserAttributes> = {};

  if (filters.guid) {
    where.guid = filters.guid;
  }

  if (filters.email) {
    where.email = filters.email;
  }

  // По умолчанию исключаем приватные поля
  const attributes = filters.includePassword
    ? undefined
    : { exclude: ['password'] };

  const user = await User.findOne({
    where,
    attributes,
    include: [
      {
        model: UserRole,
        as: 'roles',
        through: { attributes: [] },
      },
    ],
    ...repOptions,
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
}
