// Конвертация JSON Schema типов в TypeScript типы

// Вспомогательный тип для извлечения обязательных ключей из required массива
type RequiredKeys<P, R> = R extends readonly (infer K)[]
  ? K extends keyof P
    ? K
    : never
  : never;

// Основной тип с поддержкой required полей
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
  ? // Объект с required: обязательные поля + опциональные
    { [K in RequiredKeys<P, R>]: JSONSchemaType<P[K]> } & {
      [K in Exclude<keyof P, RequiredKeys<P, R>>]?: JSONSchemaType<P[K]>;
    }
  : T extends { type: 'object'; properties: infer P }
  ? // Объект без required: все поля опциональные
    { [K in keyof P]?: JSONSchemaType<P[K]> }
  : unknown;
