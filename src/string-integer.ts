import * as z from 'zod';
import { numberish } from './string-number.js';

export const StringInteger = numberish.pipe(
  z.coerce
    .string()
    .pipe(z.string().regex(/^[0-9]+$/))
    .brand('StringInteger'),
);

export type StringInteger = z.infer<typeof StringInteger>;
