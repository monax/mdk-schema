import * as z from 'zod';
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
