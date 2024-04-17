import { describe, expect, test } from 'vitest';
import { AnyColor, Color, HexColor, RgbColor, RgbaColor, toHexColor, toRgbColor } from './theme.js';

describe('theme', () => {
  test('HexColor', () => {
    // valid length - 3, 6 or 8
    expect(HexColor.parse('#fff')).toBe('#fff');
    expect(HexColor.parse('#ffffff')).toBe('#ffffff');
    expect(HexColor.parse('#ffffffff')).toBe('#ffffffff');

    // invalid length
    expect(HexColor.safeParse('#f').success).toBe(false);
    expect(HexColor.safeParse('#ff').success).toBe(false);
    expect(HexColor.safeParse('#ffff').success).toBe(false);
    expect(HexColor.safeParse('#fffff').success).toBe(false);
    expect(HexColor.safeParse('#fffffff').success).toBe(false);
    expect(HexColor.safeParse('#fffffffff').success).toBe(false);
    expect(HexColor.safeParse('#ffffffffff').success).toBe(false);

    // valid characters
    expect(HexColor.parse('#abcdef')).toBe('#abcdef');
    expect(HexColor.parse('#012346')).toBe('#012346');
    expect(HexColor.parse('#789')).toBe('#789');
    // valid - mixed case
    expect(HexColor.parse('#AbCdEf')).toBe('#AbCdEf');

    // invalid characters
    const invalidChars = 'ghijklmnopqrstuvwxyz'.split('');
    for (const char of invalidChars) {
      expect(HexColor.safeParse(`#ff${char}`).success).toBe(false);
    }

    // invalid - no hash character
    expect(HexColor.safeParse('fff').success).toBe(false);
    expect(HexColor.safeParse('ffffff').success).toBe(false);
    expect(HexColor.safeParse('ffffffff').success).toBe(false);
  });

  test('RgbColor', () => {
    // valid
    expect(RgbColor.parse('rgb(255, 255, 255)')).toBe('rgb(255, 255, 255)');
    expect(RgbColor.parse('rgb(235, 52, 52)')).toBe('rgb(235, 52, 52)');
    // with spacing
    expect(RgbColor.parse('rgb(  1  ,  1  ,  1  )')).toBe('rgb(  1  ,  1  ,  1  )');
    // without spacing
    expect(RgbColor.parse('rgb(0,0,0)')).toBe('rgb(0,0,0)');

    // invalid - out of range
    expect(RgbColor.safeParse('rgb(256, 52, 52)').success).toBe(false);
    expect(RgbColor.safeParse('rgb(52, 256, 52)').success).toBe(false);
    expect(RgbColor.safeParse('rgb(52, 52, 256)').success).toBe(false);
  });

  test('RgbaColor', () => {
    // valid
    expect(RgbaColor.parse('rgba(255, 255, 255, 1)')).toBe('rgba(255, 255, 255, 1)');
    expect(RgbaColor.parse('rgba(235, 52, 52, 0.2)')).toBe('rgba(235, 52, 52, 0.2)');
    // with spacing
    expect(RgbaColor.parse('rgba(  1  ,  1  ,  1  ,  0.2  )')).toBe('rgba(  1  ,  1  ,  1  ,  0.2  )');
    // without spacing
    expect(RgbaColor.parse('rgba(0,0,0,0.2)')).toBe('rgba(0,0,0,0.2)');

    // invalid - out of range
    expect(RgbaColor.safeParse('rgba(235, 52, 52, 1.1)').success).toBe(false);
    expect(RgbaColor.safeParse('rgba(256, 52, 52, 0.5)').success).toBe(false);
    expect(RgbaColor.safeParse('rgba(52, 256, 52, 0.5)').success).toBe(false);
    expect(RgbaColor.safeParse('rgba(52, 52, 256, 0.5)').success).toBe(false);
    expect(RgbaColor.safeParse('rgba(-1, 52, 52, 0.5)').success).toBe(false);
    expect(RgbaColor.safeParse('rgba(52, -1, 52, 0.5)').success).toBe(false);
    expect(RgbaColor.safeParse('rgba(52, 52, -1, 0.5)').success).toBe(false);
  });

  test('AnyColor', () => {
    expect(AnyColor.parse('#ffffff')).toBe('#ffffff');
    expect(AnyColor.parse('rgb(255, 255, 255)')).toBe('rgb(255, 255, 255)');
    expect(AnyColor.parse('rgba(255, 255, 255, 1)')).toBe('rgba(255, 255, 255, 1)');
  });

  test('toRgbColor - RGBA color', () => {
    const color = Color.parse('rgba(0, 255, 0, 1)'); // green
    expect(toRgbColor(color)).toBe('rgb(0, 255, 0)');
  });

  test('toRgbColor - Hex color', () => {
    const color = Color.parse('#ff0000'); // red
    expect(toRgbColor(color)).toBe('rgb(255, 0, 0)');
  });

  test('toRgbColor - RGB color', () => {
    const color = Color.parse('rgb(0, 255, 0)'); // green
    expect(toRgbColor(color)).toBe('rgb(0, 255, 0)');
  });

  test('toRgbColor - SemanticTokenColor', () => {
    const color = Color.parse({ default: '#0000ff', _dark: '#000000' }); // blue
    expect(toRgbColor(color)).toBe('rgb(0, 0, 255)');
  });

  test('toRgbColor - Invalid color format', () => {
    const color = 'invalid-color' as Color;
    expect(() => toRgbColor(color)).toThrowError('Invalid color format');
  });

  test('toHexColor - Hex color', () => {
    const color = Color.parse('#ff0000'); // red
    expect(toHexColor(color)).toBe('#ff0000');
  });

  test('toHexColor - RGB color', () => {
    const color = Color.parse('rgb(0, 255, 0)'); // green
    expect(toHexColor(color)).toBe('#00ff00');
  });

  test('toHexColor - RGBA color', () => {
    const color = Color.parse('rgba(0, 0, 255, 1)'); // blue
    expect(toHexColor(color)).toBe('#0000ff');
  });

  test('toHexColor - SemanticTokenColor', () => {
    const color = Color.parse({ default: '#0000ff', _dark: '#000000' }); // blue
    expect(toHexColor(color)).toBe('#0000ff');
  });

  test('toHexColor - Invalid color format', () => {
    const color = 'invalid-color' as Color;
    expect(() => toHexColor(color)).toThrowError('Invalid color format');
  });
});
