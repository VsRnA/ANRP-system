import * as dotenv from 'dotenv';
import { schema } from '#Lib/env/schema';
import { Env } from '#Lib/env/env';

dotenv.config({ path: '.env' });

export const env = new Env(schema, process.env);
