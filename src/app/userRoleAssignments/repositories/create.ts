import UserRoleAssignment from '#App/userRoleAssignments/models/userRoleAssignment.model';
import { CreateOptions } from 'sequelize';

interface CreateUserRoleAssignmentData {
  userGuid: string;
  roleId: number;
}

/**
 * Создает назначение роли пользователю
 */
export async function create(data: CreateUserRoleAssignmentData, repOptions?: CreateOptions): Promise<UserRoleAssignment> {
  const assignment = await UserRoleAssignment.create({
    userGuid: data.userGuid,
    roleId: data.roleId,
  }, repOptions);

  return assignment;
}
