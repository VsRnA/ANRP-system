import UserRole, { UserRoleAttributes } from '#App/userRoles/models/userRole.model';
import { WhereOptions, FindOptions } from 'sequelize';

interface GetUserRoleFilters {
  id?: number;
  keyWord?: string;
}

/**
 * Получает роль по фильтрам или null если не найдена
 */
export async function get(filters: GetUserRoleFilters, repOptions?: FindOptions): Promise<UserRole | null> {
  const where: WhereOptions<UserRoleAttributes> = {};

  if (filters.id !== undefined) {
    where.id = filters.id;
  }

  if (filters.keyWord) {
    where.keyWord = filters.keyWord;
  }

  const role = await UserRole.findOne({
    where,
    ...repOptions,
  });

  return role;
}
