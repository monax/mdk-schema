import { describe, expect, test } from 'vitest';
import { Subdomain } from './domain.js';

describe('Domain', () => {
  test('Subdomain', () => {
    // valid
    expect(Subdomain.parse('hello')).toBe('hello');
    expect(Subdomain.parse('hello-world')).toBe('hello-world');
    expect(Subdomain.parse('a')).toBe('a');

    // invalid lenght (max 63 is valid)
    expect(Subdomain.safeParse('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl').success).toBe(false);
    // invalid - uppercase characters are not allowed
    expect(Subdomain.safeParse('Hello').success).toBe(false);

    // invalid characters
    const invalidChars = '_&^.,!(){}#$@%|\\:;`<>+'.split('');
    for (const char of invalidChars) {
      expect(Subdomain.safeParse(`a${char}b`).success).toBe(false);
    }
  });
});
