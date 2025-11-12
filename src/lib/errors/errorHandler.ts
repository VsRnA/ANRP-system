import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './appError';

/**
 * Централизованный обработчик ошибок для Fastify
 */
export function errorHandler(
  error: Error | FastifyError | AppError,
  request: FastifyRequest,
  reply: FastifyReply
): void {
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      error: {
        name: error.name,
        message: error.message,
        code: error.code,
        ...(error.details && { details: error.details }),
      },
    });
    return;
  }

  if ('validation' in error && error.validation) {
    reply.status(400).send({
      error: {
        name: 'ValidationError',
        message: 'Request validation failed',
        code: 'VALIDATION_ERROR',
        details: error.validation,
      },
    });
    return;
  }

  if ('statusCode' in error && typeof error.statusCode === 'number') {
    reply.status(error.statusCode).send({
      error: {
        name: error.name || 'Error',
        message: error.message,
        code: 'FASTIFY_ERROR',
      },
    });
    return;
  }

  request.log.error(error);

  reply.status(500).send({
    error: {
      name: 'InternalServerError',
      message: 'An unexpected error occurred',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });
}
