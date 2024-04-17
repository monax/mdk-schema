import { describe, expect, test } from 'vitest';
import { HexColour, colourValues } from './hex-colour.js';

describe('HexColour', () => {
  test('HexColour validity', () => {
    expect(() => HexColour.parse('0x033344')).toThrow('invalid_string');
    HexColour.parse('#033344');
    expect(() => HexColour.parse('#03334')).toThrow('invalid_string');
    expect(colourValues('#000000')).toStrictEqual({ red: 0, green: 0, blue: 0 });
    expect(colourValues('#ffffff')).toStrictEqual({ red: 1, green: 1, blue: 1 });
    expect(colourValues('#320000')).toStrictEqual({ red: 0.19607843137254902, green: 0, blue: 0 });
    expect(() => colourValues('#ff000')).toThrow('invalid_string');
    colourValues('#ff00ff');
  });
});
