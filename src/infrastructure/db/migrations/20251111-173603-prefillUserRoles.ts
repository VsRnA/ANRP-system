import { QueryInterface } from 'sequelize';
import { ALL_ROLES } from '#Shared/roles';

/**
 * Миграция для заполнения таблицы userRoles начальными ролями
 */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    const roles = ALL_ROLES.map((role) => ({
      name: role.name,
      keyWord: role.keyWord,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('userRoles', roles, {});
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    const keyWords = ALL_ROLES.map((role) => role.keyWord);

    await queryInterface.bulkDelete('userRoles', {
      keyWord: keyWords,
    } as any, {});
  },
};
