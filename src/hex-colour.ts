import { Buffer } from 'buffer/';
import * as z from 'zod';

export const HexColour = z
  .string()
  .transform((s) => s.toLowerCase())
  .pipe(z.string().regex(/^#[a-f0-9]{6}$/))
  .pipe(z.custom<`#${string}`>())
  .brand('Hex');

export type HexColour = z.infer<typeof HexColour>;

export type ColourValues = { red: number; green: number; blue: number };

export function colourValues(str: string): ColourValues {
  const hc = HexColour.parse(str);
  const buf = Buffer.from(hc.slice(1), 'hex');
  return {
    red: buf[0] / 255,
    green: buf[1] / 255,
    blue: buf[2] / 255,
  };
}
