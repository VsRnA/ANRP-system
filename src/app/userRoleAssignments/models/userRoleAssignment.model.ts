import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import User from '#App/users/models/user.model';
import UserRole from '#App/userRoles/models/userRole.model';

export type UserRoleAssignmentAttributes = Attributes<UserRoleAssignment>;
export type UserRoleAssignmentCreationAttributes = CreationAttributes<UserRoleAssignment>;

export default class UserRoleAssignment extends Model<InferAttributes<UserRoleAssignment>, InferCreationAttributes<UserRoleAssignment>> {
  /** GUID пользователя */
  declare userGuid: string;
  /** ID роли */
  declare roleId: number;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

UserRoleAssignment.init({
  userGuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'guid',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  roleId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserRole,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'userRoleAssignments',
  modelName: 'userRoleAssignment',
  timestamps: true,
});

db.associate(() => {
  UserRoleAssignment.belongsTo(User, {
    foreignKey: 'userGuid',
    as: 'user',
  });

  UserRoleAssignment.belongsTo(UserRole, {
    foreignKey: 'roleId',
    as: 'role',
  });
});
