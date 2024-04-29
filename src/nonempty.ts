import * as z from 'zod';

export type NonEmptyStringOrNull = z.infer<typeof NonEmptyStringOrNull>;
export const NonEmptyStringOrNull = z
  .string()
  .nullable()
  .transform((s) => (s === '' ? null : s));

export type NonEmptyNumberOrNull = z.infer<typeof NonEmptyNumberOrNull>;
export const NonEmptyNumberOrNull = NonEmptyStringOrNull.pipe(z.coerce.number().nullable());
