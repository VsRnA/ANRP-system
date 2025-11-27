import UserRole, { UserRoleAttributes } from '#App/userRoles/models/userRole.model';
import { WhereOptions, FindOptions } from 'sequelize';
import { NotFoundError } from '#Lib/errors';

interface FindUserRoleFilters {
  id?: number;
  keyWord?: string;
}

export async function find(filters: FindUserRoleFilters, repOptions?: FindOptions): Promise<UserRole> {
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

  if (!role) {
    throw new NotFoundError('Role not found');
  }

  return role;
}
