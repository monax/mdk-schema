import { describe, expect, test } from 'vitest';
import { Hex } from './hex.js';

describe('Hex', () => {
  test('Hex validity', () => {
    expect(() => Hex.parse('2')).toThrow('invalid_string');
    expect(Hex.parse('0x388C818CA8B9251b393131C08a736A67ccB19297')).toEqual(
      '0x388c818ca8b9251b393131c08a736a67ccb19297',
    );
    expect(() => Hex.parse('0x')).toThrow('invalid_string');
    Hex.parse('0x0');
    Hex.parse('0x01');
    Hex.parse('0x10');
    Hex.parse('0xFF');
  });
});
