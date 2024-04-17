import { describe, expect, test } from 'vitest';
import { bytes32String } from './abi.js';

describe('Abi', () => {
  test('bytes32string', () => {
    expect(bytes32String('hello')).toEqual('0x68656c6c6f000000000000000000000000000000000000000000000000000000');
    const chars8 = '12345678';
    const chars32 = chars8 + chars8 + chars8 + chars8;
    bytes32String(chars32);
    expect(() => bytes32String(chars32 + 'O')).toThrow('too long');
  });
});
