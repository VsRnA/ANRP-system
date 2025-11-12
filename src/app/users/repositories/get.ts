import User, { UserAttributes } from '#App/users/models/user.model';
import UserRole from '#App/userRoles/models/userRole.model';
import { WhereOptions, FindOptions } from 'sequelize';

interface GetUserFilters {
  guid?: string;
  email?: string;
  includePassword?: boolean;
}

export async function get(filters: GetUserFilters, repOptions?: FindOptions): Promise<User | null> {
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

  return user;
}
