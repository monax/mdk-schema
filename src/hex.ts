import * as z from 'zod';

export const Hex = z
  .string()
  .transform((s) => s.toLowerCase())
  .pipe(z.string().regex(/^0x[a-f0-9]+$/))
  .pipe(z.custom<`0x${string}`>())
  .brand('Hex');

export type Hex = z.infer<typeof Hex>;

export const randomHex = (length: number): string => {
  const maxlen = 8;
  const min = 16 ** (Math.min(length, maxlen) - 1);
  const max = 16 ** Math.min(length, maxlen) - 1;
  const n = Math.floor(Math.random() * (max - min + 1)) + min;

  let r = n.toString(16);
  while (r.length < length) {
    r = r + randomHex(length - maxlen);
  }
  return r;
};

export const mockHex = (length = 40): Hex => {
  return Hex.parse(`0x${randomHex(length)}`);
};
