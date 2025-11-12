/**
 * Payload JWT токена
 */
export interface JwtPayload {
  userGuid: string; // guid пользователя
  iat?: number; // issued at
  exp?: number; // expiration time
}

/**
 * Опции для создания JWT токена
 */
export interface JwtSignOptions {
  expiresIn?: string | number; // Время жизни токена (например, '7d', '24h', 3600)
}
