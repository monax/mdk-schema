import { uuidv4 } from 'uuidv7';
import { describe, expect, test } from 'vitest';
import { UUID, bytes32ToUuid, bytes32ToUuidTuple, createUUID, uuidToBytes32, uuidTupleToBytes32 } from './uuid.js';

describe('UUID', () => {
  test('Parsing', () => {
    UUID.parse(uuidv4());
    const uuid = createUUID();
    expect(() => UUID.parse(uuid.slice(0, 35))).toThrow('invalid_string');
  });

  test('UUID <-> bytes32', () => {
    for (let i = 0; i < 10; i++) {
      const uuid = createUUID();
      const bytes32 = uuidToBytes32(uuid);
      const parsedUuid = bytes32ToUuid(bytes32);
      expect(parsedUuid).toBe(uuid);
    }
  });

  test('UUID tuple <-> bytes32', () => {
    for (let i = 0; i < 10; i++) {
      const uuidA = createUUID();
      const uuidB = createUUID();
      const bytes32 = uuidTupleToBytes32(uuidA, uuidB);
      const parsedUuidTuple = bytes32ToUuidTuple(bytes32);
      expect(parsedUuidTuple).toStrictEqual([uuidA, uuidB]);
    }
  });
});
