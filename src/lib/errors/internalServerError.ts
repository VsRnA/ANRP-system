import { AppError } from './appError';

/**
 * 500 Internal Server Error
 * Используется для общих серверных ошибок
 */
export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', details?: object) {
    super(message, {
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
      details,
      isOperational: false, // Серверные ошибки обычно не операционные
    });
  }
}
