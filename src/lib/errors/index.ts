// Базовый класс
export { AppError, AppErrorOptions } from './appError';

// HTTP ошибки
export { BadRequestError } from './badRequestError';
export { UnauthorizedError } from './unauthorizedError';
export { ForbiddenError } from './forbiddenError';
export { NotFoundError } from './notFoundError';
export { ConflictError } from './conflictError';
export { EntityAlreadyExistedError } from './entityAlreadyExistedError';
export { ValidationError, ValidationErrorDetail } from './validationError';
export { InternalServerError } from './internalServerError';

// Error handler для Fastify
export { errorHandler } from './errorHandler';
