import { describe, expect, test } from 'vitest';
import { StringNumber } from './string-number.js';

describe('string-number', () => {
  test('Number validity', () => {
    StringNumber.parse('2');
    StringNumber.parse('0xff');
    StringNumber.parse(32423);
    const bigun = StringNumber.parse(324232432423423432432423423423423n);
    expect(StringNumber.parse('324232432423423432432423423423423')).toEqual(bigun);
    expect(() => StringNumber.parse('hello')).toThrow('nan');
    expect(() => StringNumber.parse('')).toThrow('too_small');
  });
});
