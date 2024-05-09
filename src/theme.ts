import * as z from 'zod';

// Example of a schema for a theme:
/*
{
  "assets": {
    "logo": "https://www.osu.edu/images/osu-logo-horizontal.svg",
    "emailLogo": "https://www.osu.edu/images/osu-logo-horizontal.svg",
    "favicon": "https://www.osu.edu/images/osu-logo-horizontal.svg"
  },
  "chakra": {
    "config": {
      "initialColorMode": "light"
    },
    "colors": {
      "brand": {
        "normal": "#eb3434",
        "offset": "#fff"
      }
    }
  }
}
*/

const parseRgbValues = (s: string): [number, number, number] | null => {
  const matches = s.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/i);
  if (!matches) return null;

  const [, r, g, b] = matches.map((m) => Number.parseInt(m, 10));
  return [r, g, b];
};

const parseRgbaValues = (s: string): [number, number, number, number] | null => {
  const matches = s.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d(.\d*)?)\s*\)\s*$/i);
  if (!matches) return null;

  const [, r, g, b] = matches.map((m) => Number.parseInt(m, 10));
  return [r, g, b, Number.parseFloat(matches[4])];
};

/** A hex color string. Supports 3, 6 or 8 (alpha) character hex colors. */
export type HexColor = z.infer<typeof HexColor>;
export const HexColor = z
  .string()
  .regex(/^#(([0-9a-fA-F]{3}){1,2}|[0-9a-fA-F]{8})$/i, 'Invalid HEX color')
  .brand('HexColor');

/** RGB color in the format: 'rgb(255, 255, 255)' */
export type RgbColor = z.infer<typeof RgbColor>;
export const RgbColor = z
  .string()
  .refine((s) => {
    const matches = parseRgbValues(s);
    if (!matches) return false;

    const [r, g, b] = matches;
    if (r < 0 || r > 255) return false;
    if (g < 0 || g > 255) return false;
    if (b < 0 || b > 255) return false;

    return true;
  }, 'Invalid RGB color')
  .brand('RgbColor');

/** RGBA color in the format: 'rgba(255, 255, 255, 0.75)' */
export type RgbaColor = z.infer<typeof RgbaColor>;
export const RgbaColor = z
  .string()
  .refine((s) => {
    const matches = parseRgbaValues(s);
    if (!matches) return false;

    const [r, g, b, alpha] = matches;
    if (r < 0 || r > 255) return false;
    if (g < 0 || g > 255) return false;
    if (b < 0 || b > 255) return false;

    if (alpha < 0 || alpha > 1) return false;

    return true;
  }, 'Invalid RGBA color')
  .brand('RgbaColor');

export type AnyColor = z.infer<typeof AnyColor>;
export const AnyColor = z.union([HexColor, RgbColor, RgbaColor]);

const SemanticTokenColor = z.object({
  default: AnyColor,
  _dark: AnyColor,
});

export type Color = z.infer<typeof Color>;
export const Color = z.union([AnyColor, SemanticTokenColor]);

const ChakraTheme = z.object({
  config: z.object({
    initialColorMode: z.enum(['light', 'dark']),
  }),
  colors: z.object({
    brand: z.object({
      normal: Color,
      offset: Color,
    }),
  }),
});

const Assets = z.object({
  logo: z.string().url(),
  emailLogo: z.string().url(),
  favicon: z.string().url(),
});

export type RequiredTheme = z.infer<typeof RequiredTheme>;
export const RequiredTheme = z.object({
  chakra: ChakraTheme,
  assets: Assets,
});

export type Theme = z.infer<typeof Theme>;
export const Theme = RequiredTheme.deepPartial();

export const toRgbColor = (color: Color): RgbColor => {
  // Convert RGB color to RGB (no-op)
  const rgbColor = RgbColor.safeParse(color);
  if (rgbColor.success) return rgbColor.data;

  // Convert hex color to RGB
  const hexColor = HexColor.safeParse(color);
  if (hexColor.success) {
    const rgb = hexColor.data.slice(1, 7);
    const r = Number.parseInt(rgb.slice(0, 2), 16);
    const g = Number.parseInt(rgb.slice(2, 4), 16);
    const b = Number.parseInt(rgb.slice(4, 6), 16);
    return RgbColor.parse(`rgb(${r}, ${g}, ${b})`);
  }

  // Convert RGBA color to RGB
  const rgbaColor = RgbaColor.safeParse(color);
  if (rgbaColor.success) {
    const matches = parseRgbaValues(rgbaColor.data);
    if (matches) {
      const [r, g, b] = matches;
      return RgbColor.parse(`rgb(${r}, ${g}, ${b})`);
    }
  }

  // Convert SemanticTokenColor to RGB
  const semanticTokenColor = SemanticTokenColor.safeParse(color);
  if (semanticTokenColor.success) return toRgbColor(semanticTokenColor.data.default);

  throw new Error('Invalid color format');
};

export const toHexColor = (color: Color): HexColor => {
  // Convert HEX color to HEX (no-op)
  const hexColor = HexColor.safeParse(color);
  if (hexColor.success) return hexColor.data;

  // Convert RGB color to HEX
  const rgbColor = RgbColor.safeParse(color);
  if (rgbColor.success) {
    const matches = parseRgbValues(rgbColor.data);
    if (matches) {
      const [r, g, b] = matches;
      return HexColor.parse(`#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}`);
    }
  }

  // Convert RGBA color to HEX
  const rgbaColor = RgbaColor.safeParse(color);
  if (rgbaColor.success) {
    const matches = parseRgbaValues(rgbaColor.data);
    if (matches) {
      const [r, g, b] = matches;
      return HexColor.parse(`#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}`);
    }
  }

  // Convert SemanticTokenColor to HEX
  const semanticTokenColor = SemanticTokenColor.safeParse(color);
  if (semanticTokenColor.success) return toHexColor(semanticTokenColor.data.default);

  throw new Error('Invalid color format');
};

const decimalToHex = (n: number) => n.toString(16).padStart(2, '0');
