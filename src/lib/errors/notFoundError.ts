import { AppError } from './appError';

/**
 * 404 Not Found
 * Используется когда запрашиваемый ресурс не найден
 */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: object) {
    super(message, {
      statusCode: 404,
      code: 'NOT_FOUND',
      details,
    });
  }
}
