import { AppError } from './appError';

/**
 * 409 Conflict
 * Используется когда запрос конфликтует с текущим состоянием ресурса
 * (например, email уже занят при регистрации)
 */
export class ConflictError extends AppError {
  constructor(message = 'Conflict', details?: object) {
    super(message, {
      statusCode: 409,
      code: 'CONFLICT',
      details,
    });
  }
}
