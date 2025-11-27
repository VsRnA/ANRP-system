import { FastifyReply, FastifyRequest } from 'fastify';
import { JSONSchemaType } from '#Shared/types/jsonSchema';
import User from '#App/users/models/user.model';

export interface RequestContext {
  user?: User;
}

declare module 'fastify' {
  interface FastifyRequest {
    payload: any;
    context: RequestContext;
  }
}

export interface TypedFastifyRequest<TBody, TParams = unknown, TQuery = unknown> extends FastifyRequest {
  payload: TBody;
  params: TParams;
  query: TQuery;
}

export type TypedRouteHandler<TBody, TResponse, TParams = unknown, TQuery = unknown> = (
  request: TypedFastifyRequest<TBody, TParams, TQuery>,
  reply: FastifyReply
) => Promise<TResponse> | TResponse;

export type InferPayload<TSchema> = TSchema extends { payload: infer P }
  ? JSONSchemaType<P>
  : unknown;

  export type InferParams<TSchema> = TSchema extends { params: infer P }
  ? JSONSchemaType<P>
  : unknown;

export type InferQuery<TSchema> = TSchema extends { query: infer Q }
  ? JSONSchemaType<Q>
  : unknown;

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
