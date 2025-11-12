import { QueryInterface, DataTypes } from 'sequelize';

/**
 * Миграция для создания таблицы userRoles
 */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('userRoles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // Создаем индекс на keyWord для быстрого поиска
    await queryInterface.addIndex('userRoles', ['keyWord'], {
      unique: true,
      name: 'userRoles_keyWord_unique',
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('userRoles');
  },
};
