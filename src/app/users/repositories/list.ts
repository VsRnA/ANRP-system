import User, { UserAttributes } from '#App/users/models/user.model';
import UserRole from '#App/userRoles/models/userRole.model';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';

interface ListUserFilters {
  guid?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  limit?: number;
  offset?: number;
  includePassword?: boolean;
}

/**
 * Получает список пользователей с фильтрацией и пагинацией
 */
export async function list(filters: ListUserFilters = {}, repOptions?: FindOptions) {
  const where: WhereOptions<UserAttributes> = {};

  if (filters.guid) {
    where.guid = filters.guid;
  }

  if (filters.email) {
    where.email = { [Op.iLike]: `%${filters.email}%` };
  }

  if (filters.firstName) {
    where.firstName = { [Op.iLike]: `%${filters.firstName}%` };
  }

  if (filters.lastName) {
    where.lastName = { [Op.iLike]: `%${filters.lastName}%` };
  }

  // По умолчанию исключаем приватные поля
  const attributes = filters.includePassword
    ? undefined
    : { exclude: ['password'] };

  const users = await User.findAll({
    where,
    attributes,
    include: [
      {
        model: UserRole,
        as: 'roles',
        through: { attributes: [] },
      },
    ],
    limit: filters.limit || 20,
    offset: filters.offset || 0,
    order: [['createdAt', 'DESC']],
    ...repOptions,
  });

  return plainify(users);
}
