import { Big, BigDecimal } from 'bigdecimal.js';
import * as z from 'zod';

const bigDecimalSchema = z.custom<BigDecimal>((v) => v instanceof BigDecimal);

// Mirroring the BigDecimal.fromValue constructor
export const Numeric = z.union([bigDecimalSchema, z.number(), z.string(), z.bigint()]).transform((v, ctx) => {
  try {
    return Big(v);
  } catch (err) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'invalid_numeric: ' + (isErrorWithMessage(err) ? err.message : ''),
      fatal: true,
    });
    return z.NEVER;
  }
});

// This is literally just BigDecimal
export type Numeric = z.infer<typeof Numeric>;

function isErrorWithMessage(err: unknown): err is { message: string } {
  return typeof err === 'object' && err !== null && 'message' in err;
}
