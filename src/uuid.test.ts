import { uuidv4 } from 'uuidv7';
import { describe, expect, test } from 'vitest';
import { UUID, createUUID } from './uuid.js';

describe('UUID', () => {
  test('Parsing', () => {
    UUID.parse(uuidv4());
    const uuid = createUUID();
    expect(() => UUID.parse(uuid.slice(0, 35))).toThrow('invalid_string');
  });
});
