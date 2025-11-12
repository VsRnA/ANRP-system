import { AppError } from './appError';

export interface ValidationErrorDetail {
  field: string;
  message: string;
  value?: unknown;
}

/**
 * 422 Unprocessable Entity
 * Используется когда данные запроса не прошли валидацию
 */
export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: ValidationErrorDetail[]) {
    super(message, {
      statusCode: 422,
      code: 'VALIDATION_ERROR',
      details,
    });
  }
}
