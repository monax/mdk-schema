import { uuidv7 } from 'uuidv7';
import * as z from 'zod';

export const UUID = z.string().uuid().brand('UUID');

export type UUID = z.infer<typeof UUID>;

export function createUUID(): UUID {
  // Mixed time-ordered/random UUID for better database locality
  return UUID.parse(uuidv7());
}
