import { AppError } from './appError';

/**
 * 403 Forbidden
 * Используется когда доступ к ресурсу запрещён
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details?: object) {
    super(message, {
      statusCode: 403,
      code: 'FORBIDDEN',
      details,
    });
  }
}
