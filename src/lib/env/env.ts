import Ajv from 'ajv';
import type { SchemaObject } from 'ajv';
import { JSONSchemaType } from '#Shared/types/jsonSchema';

const ajv = new Ajv(
  {
    allErrors: true,
    coerceTypes: true,
    removeAdditional: true,
    useDefaults: true,
  },
);

export class Env<T extends SchemaObject> {
  schema: T;
  validateObject: JSONSchemaType<T>;
  constructor(schema: T, envObject: Record<string, unknown>) {
    this.schema = schema;
    this.validateObject = { ...envObject } as JSONSchemaType<T>;
  }

  init() {
    console.log('Loading environment variables...');
    const validate = ajv.compile(this.schema);
    if (!validate(this.validateObject)) {
      throw new Error(JSON.stringify(validate.errors));
    }
  }

  get<Key extends keyof JSONSchemaType<T>>(name: Key) {
    return this.validateObject[name];
  }
}
