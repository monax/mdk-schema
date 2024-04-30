import * as z from 'zod';
import { ConfigBag } from './environment.js';

export type PgConfig = ConfigBag<typeof PgConfigBag>;
export const PgConfigBag = {
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PORT: z.coerce.number().int(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
} as const;
