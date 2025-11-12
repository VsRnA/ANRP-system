import { AppError } from './appError';

/**
 * 409 Conflict - Entity Already Existed
 * Используется когда пытаемся создать сущность, которая уже существует
 * (например, пользователь с таким email уже зарегистрирован)
 */
export class EntityAlreadyExistedError extends AppError {
  constructor(entityName: string, identifiers: Record<string, unknown>) {
    const identifierStrings = Object.entries(identifiers)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    const message = `${entityName} with ${identifierStrings} already exists`;

    super(message, {
      statusCode: 409,
      code: 'ENTITY_ALREADY_EXISTS',
      details: {
        entity: entityName,
        identifiers,
      },
    });
  }
}
