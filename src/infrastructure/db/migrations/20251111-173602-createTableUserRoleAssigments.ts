import { QueryInterface, DataTypes } from 'sequelize';

/**
 * Миграция для создания таблицы userRoleAssignments (связь users и userRoles)
 */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('userRoleAssignments', {
      userGuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'guid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'userRoles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // Создаем индексы для foreign keys
    await queryInterface.addIndex('userRoleAssignments', ['userGuid'], {
      name: 'userRoleAssignments_userGuid_index',
    });

    await queryInterface.addIndex('userRoleAssignments', ['roleId'], {
      name: 'userRoleAssignments_roleId_index',
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('userRoleAssignments');
  },
};
