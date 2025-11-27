import { FastifyInstance, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { InferPayload, InferParams, InferQuery, InferResponse, TypedRouteHandler } from '#Lib/http/types';
import { Hooks } from './hooks';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

interface RouteOptions {
  authOnly?: boolean;
}

export class Handler {
  #app: FastifyInstance;
  #hooks: Hooks;

  constructor(app: FastifyInstance, hooks: Hooks) {
    this.#app = app;
    this.#hooks = hooks;
    this.#setupPayloadSupport();
  }

  #setupPayloadSupport(): void {
    this.#app.addHook('onRequest', async (request: FastifyRequest) => {
      Object.defineProperty(request, 'payload', {
        get() {
          return request.body;
        },
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(request, 'context', {
        value: {},
        writable: true,
        enumerable: true,
        configurable: true,
      });
    });
  }

  #registerRoute<TSchema>(
    method: HttpMethod,
    path: string,
    schema: TSchema,
    handler: TypedRouteHandler<InferPayload<TSchema>, InferResponse<TSchema>, InferParams<TSchema>, InferQuery<TSchema>>,
    options?: RouteOptions
  ): void {
    const fastifyOptions: RouteShorthandOptions = {
      schema: {} as any,
    };

    if (options?.authOnly !== false) {
      const globalHooks = this.#hooks.getAllGlobalByType('preHandler');

      if (globalHooks.size > 0) {
        const hookHandlers: Array<(request: any, reply: any) => Promise<void>> = [];

        for (const [, hook] of globalHooks) {
          hookHandlers.push(async (request, reply) => {
            await new Promise<void>((resolve, reject) => {
              hook(request, reply, (error) => {
                if (error) reject(error);
                else resolve();
              });
            });
          });
        }

        if (hookHandlers.length > 0) {
          fastifyOptions.preHandler = async (request, reply) => {
            for (const handler of hookHandlers) {
              await handler(request, reply);
            }
          };
        }
      }
    }

    const schemaObj = schema as any;
    if (schemaObj) {
      if ('payload' in schemaObj) {
        (fastifyOptions.schema as any).body = schemaObj.payload;
      }
      if ('response' in schemaObj) {
        (fastifyOptions.schema as any).response = schemaObj.response;
      }
      if ('query' in schemaObj) {
        (fastifyOptions.schema as any).querystring = schemaObj.query;
      }
      if ('params' in schemaObj) {
        (fastifyOptions.schema as any).params = schemaObj.params;
      }
      if ('headers' in schemaObj) {
        (fastifyOptions.schema as any).headers = schemaObj.headers;
      }
    }

    this.#app[method](path, fastifyOptions, handler as any);
  }

  get<TSchema>(
    path: string,
    schema: TSchema,
    handler: TypedRouteHandler<InferPayload<TSchema>, InferResponse<TSchema>, InferParams<TSchema>, InferQuery<TSchema>>,
    options?: RouteOptions
  ): void {
    this.#registerRoute('get', path, schema, handler, options);
  }

  post<TSchema>(
    path: string,
    schema: TSchema,
    handler: TypedRouteHandler<InferPayload<TSchema>, InferResponse<TSchema>, InferParams<TSchema>, InferQuery<TSchema>>,
    options?: RouteOptions
  ): void {
    this.#registerRoute('post', path, schema, handler, options);
  }

  put<TSchema>(
    path: string,
    schema: TSchema,
    handler: TypedRouteHandler<InferPayload<TSchema>, InferResponse<TSchema>, InferParams<TSchema>, InferQuery<TSchema>>,
    options?: RouteOptions
  ): void {
    this.#registerRoute('put', path, schema, handler, options);
  }

  patch<TSchema>(
    path: string,
    schema: TSchema,
    handler: TypedRouteHandler<InferPayload<TSchema>, InferResponse<TSchema>, InferParams<TSchema>, InferQuery<TSchema>>,
    options?: RouteOptions
  ): void {
    this.#registerRoute('patch', path, schema, handler, options);
  }

  delete<TSchema>(
    path: string,
    schema: TSchema,
    handler: TypedRouteHandler<InferPayload<TSchema>, InferResponse<TSchema>, InferParams<TSchema>, InferQuery<TSchema>>,
    options?: RouteOptions
  ): void {
    this.#registerRoute('delete', path, schema, handler, options);
  }
}
