import { FastifyReply, FastifyRequest } from 'fastify';
import { JSONSchemaType } from '#Shared/types/jsonSchema';
import User from '#App/users/models/user.model';

// Интерфейс контекста запроса
export interface RequestContext {
  user?: User;
}

// Переопределение стандартных типов Fastify
declare module 'fastify' {
  interface FastifyRequest {
    payload: any;
    context: RequestContext;
  }
}

// Типизированный request с payload, params и query
export interface TypedFastifyRequest<TBody, TParams = unknown, TQuery = unknown> extends FastifyRequest {
  payload: TBody;
  params: TParams;
  query: TQuery;
}

// Типизированный handler
export type TypedRouteHandler<TBody, TResponse, TParams = unknown, TQuery = unknown> = (
  request: TypedFastifyRequest<TBody, TParams, TQuery>,
  reply: FastifyReply
) => Promise<TResponse> | TResponse;

// Извлечение типа payload из схемы
export type InferPayload<TSchema> = TSchema extends { payload: infer P }
  ? JSONSchemaType<P>
  : unknown;

// Извлечение типа params из схемы
export type InferParams<TSchema> = TSchema extends { params: infer P }
  ? JSONSchemaType<P>
  : unknown;

// Извлечение типа query из схемы
export type InferQuery<TSchema> = TSchema extends { query: infer Q }
  ? JSONSchemaType<Q>
  : unknown;

// Извлечение типа response из схемы (берем первый успешный статус код)
export type InferResponse<TSchema> = TSchema extends { response: infer R }
  ? R extends { 200: infer R200 }
    ? JSONSchemaType<R200>
    : R extends { 201: infer R201 }
    ? JSONSchemaType<R201>
    : R extends { 204: any }
    ? void
    : R extends { [key: number]: infer RDefault }
    ? JSONSchemaType<RDefault>
    : unknown
  : unknown;
