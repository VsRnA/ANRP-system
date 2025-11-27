type RequiredKeys<P, R> = R extends readonly (infer K)[]
  ? K extends keyof P
    ? K
    : never
  : never;

export type JSONSchemaType<T> = T extends { type: 'string' }
  ? string
  : T extends { type: 'number' }
  ? number
  : T extends { type: 'integer' }
  ? number
  : T extends { type: 'boolean' }
  ? boolean
  : T extends { type: 'array'; items: infer I }
  ? JSONSchemaType<I>[]
  : T extends { type: 'object'; properties: infer P; required: infer R }
  ? 
    { [K in RequiredKeys<P, R>]: JSONSchemaType<P[K]> } & {
      [K in Exclude<keyof P, RequiredKeys<P, R>>]?: JSONSchemaType<P[K]>;
    }
  : T extends { type: 'object'; properties: infer P }
  ? 
    { [K in keyof P]?: JSONSchemaType<P[K]> }
  : unknown;
