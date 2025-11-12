import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

/**
 * Универсальный тип хука Fastify
 */
export type HookHandler = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => Promise<void> | void;

/**
 * Типы хуков Fastify
 */
export type HookType =
  | 'onRequest'
  | 'preParsing'
  | 'preValidation'
  | 'preHandler'
  | 'preSerialization'
  | 'onError'
  | 'onSend'
  | 'onResponse'
  | 'onTimeout'
  | 'onRequestAbort';

/**
 * Универсальный класс для управления хуками HTTP транспорта
 * Позволяет регистрировать хуки по имени и типу из infrastructure слоя
 */
export class Hooks {
  // Хранилище хуков: { hookType: { hookName: handler } }
  #hooks: Map<HookType, Map<string, HookHandler>>;
  // Глобальные хуки, которые применяются ко всем роутам по умолчанию
  #globalHooks: Map<HookType, Map<string, HookHandler>>;

  constructor() {
    this.#hooks = new Map();
    this.#globalHooks = new Map();
  }

  /**
   * Регистрирует хук
   * @param type - Тип хука (onRequest, preHandler, и т.д.)
   * @param name - Имя хука (например, 'auth', 'logging', 'validation')
   * @param handler - Функция-обработчик хука
   */
  register(type: HookType, name: string, handler: HookHandler): void {
    if (!this.#hooks.has(type)) {
      this.#hooks.set(type, new Map());
    }

    const hooksOfType = this.#hooks.get(type)!;
    hooksOfType.set(name, handler);
  }

  /**
   * Регистрирует глобальный хук, который применяется ко всем роутам по умолчанию
   * @param type - Тип хука (onRequest, preHandler, и т.д.)
   * @param name - Имя хука (например, 'auth', 'logging', 'validation')
   * @param handler - Функция-обработчик хука
   */
  registerGlobal(type: HookType, name: string, handler: HookHandler): void {
    if (!this.#globalHooks.has(type)) {
      this.#globalHooks.set(type, new Map());
    }

    const hooksOfType = this.#globalHooks.get(type)!;
    hooksOfType.set(name, handler);
  }

  /**
   * Получает хук по типу и имени
   * @param type - Тип хука
   * @param name - Имя хука
   * @returns Обработчик хука или undefined
   */
  get(type: HookType, name: string): HookHandler | undefined {
    return this.#hooks.get(type)?.get(name);
  }

  /**
   * Получает все хуки определенного типа
   * @param type - Тип хука
   * @returns Map с хуками этого типа
   */
  getAllByType(type: HookType): Map<string, HookHandler> {
    return this.#hooks.get(type) || new Map();
  }

  /**
   * Получает все глобальные хуки определенного типа
   * @param type - Тип хука
   * @returns Map с глобальными хуками этого типа
   */
  getAllGlobalByType(type: HookType): Map<string, HookHandler> {
    return this.#globalHooks.get(type) || new Map();
  }

  /**
   * Проверяет, зарегистрирован ли хук
   * @param type - Тип хука
   * @param name - Имя хука
   */
  has(type: HookType, name: string): boolean {
    return this.#hooks.get(type)?.has(name) || false;
  }

  /**
   * Удаляет хук
   * @param type - Тип хука
   * @param name - Имя хука
   */
  remove(type: HookType, name: string): boolean {
    return this.#hooks.get(type)?.delete(name) || false;
  }

  /**
   * Очищает все хуки определенного типа
   * @param type - Тип хука
   */
  clearType(type: HookType): void {
    this.#hooks.delete(type);
  }

  /**
   * Очищает все хуки
   */
  clearAll(): void {
    this.#hooks.clear();
  }
}
