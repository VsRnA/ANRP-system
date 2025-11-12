import { AppError } from './appError';

/**
 * 400 Bad Request
 * Используется когда запрос клиента некорректен
 */
export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details?: object) {
    super(message, {
      statusCode: 400,
      code: 'BAD_REQUEST',
      details,
    });
  }
}
