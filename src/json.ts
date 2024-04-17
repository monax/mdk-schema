import * as z from 'zod';

export type JsonArray = Json[];

export type JsonRecord = { [key: string]: Json };

export type Json = null | boolean | number | string | JsonArray | JsonRecord;

export const JsonString = z.string().transform((str, ctx): Json => {
  try {
    return JSON.parse(str);
  } catch (e) {
    ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
    return z.NEVER;
  }
});
