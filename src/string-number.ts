import * as z from 'zod';

export const numberish = z.union([z.number(), z.string().min(1), z.bigint()]);
export const StringNumber = numberish.pipe(z.coerce.number());
