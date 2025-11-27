import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

export type HookHandler = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => Promise<void> | void;

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

export class Hooks {
  #hooks: Map<HookType, Map<string, HookHandler>>;
  #globalHooks: Map<HookType, Map<string, HookHandler>>;

  constructor() {
    this.#hooks = new Map();
    this.#globalHooks = new Map();
  }

  register(type: HookType, name: string, handler: HookHandler): void {
    if (!this.#hooks.has(type)) {
      this.#hooks.set(type, new Map());
    }

    const hooksOfType = this.#hooks.get(type)!;
    hooksOfType.set(name, handler);
  }

  registerGlobal(type: HookType, name: string, handler: HookHandler): void {
    if (!this.#globalHooks.has(type)) {
      this.#globalHooks.set(type, new Map());
    }

    const hooksOfType = this.#globalHooks.get(type)!;
    hooksOfType.set(name, handler);
  }

  get(type: HookType, name: string): HookHandler | undefined {
    return this.#hooks.get(type)?.get(name);
  }

  getAllByType(type: HookType): Map<string, HookHandler> {
    return this.#hooks.get(type) || new Map();
  }

  getAllGlobalByType(type: HookType): Map<string, HookHandler> {
    return this.#globalHooks.get(type) || new Map();
  }

  has(type: HookType, name: string): boolean {
    return this.#hooks.get(type)?.has(name) || false;
  }

  remove(type: HookType, name: string): boolean {
    return this.#hooks.get(type)?.delete(name) || false;
  }

  clearType(type: HookType): void {
    this.#hooks.delete(type);
  }

  clearAll(): void {
    this.#hooks.clear();
  }
}
