export interface AppErrorOptions {
  statusCode?: number;
  code?: string;
  details?: object;
  isOperational?: boolean;
}

/**
 * Базовый класс для всех кастомных ошибок приложения
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: object;
  public readonly isOperational: boolean;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message);

    // Устанавливаем правильное имя класса для наследников
    this.name = this.constructor.name;

    // Устанавливаем значения по умолчанию
    this.statusCode = options.statusCode ?? 500;
    this.code = options.code ?? 'INTERNAL_ERROR';
    this.details = options.details;
    this.isOperational = options.isOperational ?? true;

    // Сохраняем stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Преобразование ошибки в JSON для ответа клиенту
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      ...(this.details && { details: this.details }),
    };
  }
}
