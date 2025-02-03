import { z } from 'zod';
import { JsonString } from './json.js';

export type ValidationError = z.infer<typeof ValidationError>;
export const ValidationError = z
  .object({
    path: z.union([z.string(), z.array(z.union([z.string(), z.number()]))]),
    message: z.string(),
  })
  .transform(({ path, message }) => ({ path: Array.isArray(path) ? path.join('.') : path, message }));

export type ValidationErrors = z.infer<typeof ValidationErrors>;
export const ValidationErrors = z.array(ValidationError);

export type ValidationErrorsString = z.infer<typeof ValidationErrorsString>;
export const ValidationErrorsString = JsonString.pipe(ValidationErrors);

export type ErrorLike = { name: string; message: string };
export function isErrorLike(obj: unknown): obj is ErrorLike {
  return typeof obj === 'object' && obj !== null && 'message' in obj && 'name' in obj;
}

// Raise is helpful when using null-coalescing operators as you get both a compile-time
// type narrowing and a runtime exception where its not met.
//
// usage:
// const input: string | undefined = /* TBD */
// const output: string = input ?? raise("Input must be specified")
// type TIn = typeof input // string | undefined
// type TOut = typeof output // string

export const raise = (err: string): never => {
  throw new Error(err);
};

export function formatZodErrors(error: z.ZodError) {
  return error.errors
    .map((e) => {
      if (e.code === 'invalid_type') {
        return `${e.message} '${e.path.join('.')}'! Received: ${e.received}; Expected: ${e.expected}`;
      }
      return `${e.message} '${e.path.join('.')}'! Code: ${e.code}`;
    })
    .join('\n');
}
