import { describe, expect, test } from 'vitest';
import { ChainId, ChainName, SimpleHashChainId, SimpleHashChainName } from './chain.js';

describe('chain', () => {
  test('ChainId', () => {
    expect(() => ChainId.parse(2)).toThrow('invalid_enum_value');
    expect(ChainId.parse(8453)).toBe(8453);
    expect(ChainId.enum['Base_Goerli']).toBe(84531);
  });

  test('ChainName', () => {
    expect(() => ChainName.parse('Base')).toThrow('invalid_enum_value');
    expect(ChainName.parse('Base_Goerli')).toBe('Base_Goerli');
    expect(ChainName.enum['8453']).toBe('Base_Mainnet');
    // type interop with ChainId
    expect(ChainName.enum[ChainId.parse(8453)]).toBe('Base_Mainnet');
  });

  test('SimpleHashChainId', () => {
    expect(() => SimpleHashChainId.parse(2)).toThrow('invalid_enum_value');
    expect(SimpleHashChainId.parse(8453)).toBe(8453);
    expect(SimpleHashChainId.enum['base-goerli']).toBe(84531);
  });

  test('SimpleHashChainName', () => {
    expect(() => SimpleHashChainName.parse('Base')).toThrow('invalid_enum_value');
    expect(SimpleHashChainName.parse('base-goerli')).toBe('base-goerli');
    expect(SimpleHashChainName.enum['8453']).toBe('base');
    // type interop with ChainId
    expect(SimpleHashChainName.enum[ChainId.parse(8453)]).toBe('base');
  });
});
