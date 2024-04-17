import * as z from 'zod';

export const Hex = z
  .string()
  .transform((s) => s.toLowerCase())
  .pipe(z.string().regex(/^0x[a-f0-9]+$/))
  .pipe(z.custom<`0x${string}`>())
  .brand('Hex');

export type Hex = z.infer<typeof Hex>;
