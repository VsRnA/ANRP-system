export const ROLES = {
  USER: {
    keyWord: 'user',
    name: 'Пользователь',
  },
  ADMIN: {
    keyWord: 'admin',
    name: 'Администратор',
  },
} as const;

export type RoleKeyWord = typeof ROLES[keyof typeof ROLES]['keyWord'];

export const ALL_ROLES = Object.values(ROLES);
