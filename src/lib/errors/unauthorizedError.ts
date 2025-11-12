import { AppError } from './appError';

/**
 * 401 Unauthorized
 * Используется когда требуется аутентификация
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: object) {
    super(message, {
      statusCode: 401,
      code: 'UNAUTHORIZED',
      details,
    });
  }
}
