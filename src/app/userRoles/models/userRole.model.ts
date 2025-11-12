import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import UserRoleAssignment from '#App/userRoleAssignments/models/userRoleAssignment.model';
import User from '#App/users/models/user.model';

export type UserRoleAttributes = Attributes<UserRole>;
export type UserRoleCreationAttributes = CreationAttributes<UserRole>;

export default class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
  /** ID роли */
  declare id: CreationOptional<number>;
  /** Название роли */
  declare name: string;
  /** Ключевое слово роли */
  declare keyWord: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

UserRole.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keyWord: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'userRoles',
  modelName: 'userRole',
  timestamps: true,
});

db.associate(() => {
  UserRole.belongsToMany(User, {
    through: UserRoleAssignment,
    foreignKey: 'roleId',
    otherKey: 'userGuid',
    as: 'users',
  });
});
