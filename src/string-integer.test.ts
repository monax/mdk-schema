import { describe, expect, test } from 'vitest';
import { StringInteger } from './string-integer.js';

describe('StringInteger', () => {
  test('Number validity', () => {
    StringInteger.parse('2');
    StringInteger.parse(32423);
    const bigun = StringInteger.parse(324232432423423432432423423423423n);
    expect(StringInteger.parse('324232432423423432432423423423423')).toEqual(bigun);
    const bigun2 = StringInteger.parse('32423243242342343243242342342342343534543534534');
    expect(StringInteger.parse('32423243242342343243242342342342343534543534534')).toEqual(bigun2);
    expect(() => StringInteger.parse('hello')).toThrow('invalid_string');
    expect(() => StringInteger.parse('')).toThrow('too_small');
  });
});
