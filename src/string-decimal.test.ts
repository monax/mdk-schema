import { describe, expect, test } from 'vitest';
import { PositiveStringDecimal, StringDecimal } from './string-decimal.js';

describe('Amount', () => {
  test('Edge cases', () => {
    expect(() => StringDecimal.parse('hello')).toThrow('invalid_numeric');
    expect(() => StringDecimal.parse('')).toThrow('invalid_numeric');
    expect(() => StringDecimal.parse(Number.POSITIVE_INFINITY)).toThrow('invalid_numeric');
    expect(() => StringDecimal.parse(Number.NEGATIVE_INFINITY)).toThrow('invalid_numeric');
    // spaces are not allowed
    expect(() => StringDecimal.parse('123 4')).toThrow('invalid_numeric');
    // no support for hexadecimals
    expect(() => StringDecimal.parse('0xff')).toThrow('invalid_numeric');
  });

  test('Valid cases', () => {
    StringDecimal.parse(0);
    StringDecimal.parse(-0);
    StringDecimal.parse('-1e6');
    // amount is ensured to be a valid numeric string but is not parsed to any particular type
    expect(StringDecimal.parse('-1.123456789e6')).toMatchInlineSnapshot('"-1123456.789"');
  });
});

describe('PositiveStringDecimal', () => {
  test('Edge cases', () => {
    expect(() => PositiveStringDecimal.parse('hello')).toThrow('invalid_numeric');
    expect(() => PositiveStringDecimal.parse('')).toThrow('invalid_numeric');
    expect(() => PositiveStringDecimal.parse(Number.POSITIVE_INFINITY)).toThrow('invalid_numeric');
    expect(() => PositiveStringDecimal.parse(Number.NEGATIVE_INFINITY)).toThrow('invalid_numeric');
    // spaces are not allowed
    expect(() => PositiveStringDecimal.parse('123 4')).toThrow('invalid_numeric');
    // no support for hexadecimals
    expect(() => PositiveStringDecimal.parse('0xff')).toThrow('invalid_numeric');
    // negative numbers are not allowed
    expect(() => PositiveStringDecimal.parse('-0.1')).toThrow('invalid_positive_decimal_string');
  });

  test('Valid cases', () => {
    PositiveStringDecimal.parse(0);
    expect(PositiveStringDecimal.parse('1.123456789e6')).toMatchInlineSnapshot('"1123456.789"');
  });
});
