import * as z from 'zod';

export type JsonArray = Json[];

export type JsonRecord = { [key: string]: Json };

export const Literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export type Literal = z.infer<typeof Literal>;

export type Json = Literal | JsonArray | JsonRecord;
export const Json: z.ZodType<Json> = z.lazy(() => z.union([Literal, z.array(Json), z.record(Json)]));

export const JsonString = z.string().transform((str, ctx): Json => {
  try {
    return JSON.parse(str);
  } catch (_e) {
    ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
    return z.NEVER;
  }
});
