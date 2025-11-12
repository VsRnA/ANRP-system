import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import UserRoleAssignment from '#App/userRoleAssignments/models/userRoleAssignment.model';
import UserRole from '#App/userRoles/models/userRole.model';

export type UserAttributes = Attributes<User>;
export type UserCreationAttributes = CreationAttributes<User>;

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  /** UUID пользователя */
  declare guid: CreationOptional<string>;
  /** Email пользователя */
  declare email: string;
  /** Hash пароль пользователя */
  declare password: string;
  /** Имя пользователя */
  declare firstName: string;
  /** Фамилия пользователя */
  declare lastName: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

User.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'users',
  modelName: 'user',
  paranoid: true,
  timestamps: true,
});

db.associate(() => {
  User.belongsToMany(UserRole, {
    through: UserRoleAssignment,
    foreignKey: 'userGuid',
    otherKey: 'roleId',
    as: 'roles',
  });
});