import { describe, expect, test } from 'vitest';
import * as z from 'zod';
import { JsonString } from './json.js';

describe('Json', () => {
  test('JsonString', () => {
    JsonString.parse('{"a": 1}');
    JsonString.parse('0');
    expect(() => JsonString.parse('{"a": 1"}')).toThrow('Invalid JSON');
    expect(() => JsonString.parse('')).toThrow('Invalid JSON');
    const schema = JsonString.pipe(z.object({ a: z.array(z.number()) }));
    const foo = schema.parse('{"a": [1]}');
    expect(foo).toEqual({ a: [1] });
    // Valid JSON, invalid composite type
    expect(() => schema.parse('{"a": ["b"]}')).toThrow('invalid_type');
  });
});
