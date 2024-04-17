import { describe, expect, test } from 'vitest';
import {
  Address,
  ChainAddress,
  TokenAddress,
  decodeChainAddress,
  decodeTokenAddress,
  encodeChainAddress,
  encodeTokenAddress,
  encodeTokenForSimpleHash,
} from './address.js';

describe('Address', () => {
  test('Address validity', () => {
    expect(() => Address.parse('2')).toThrow('invalid_string');
    expect(Address.parse('0x388C818CA8B9251b393131C08a736A67ccB19297')).toEqual(
      '0x388c818ca8b9251b393131c08a736a67ccb19297',
    );
  });

  test('encodeChainAddress', () => {
    const chainAddress = ChainAddress.parse({
      chainId: 8453,
      address: '0x388c818ca8b9251b393131c08a736a67ccb19297',
    });
    expect(encodeChainAddress(chainAddress)).toMatchInlineSnapshot('"8453-0x388c818ca8b9251b393131c08a736a67ccb19297"');
  });

  test('decodeChainAddress', () => {
    expect(decodeChainAddress('8453-0x388C818CA8B9251b393131C08a736A67ccB19297')).toEqual({
      chainId: 8453,
      address: '0x388c818ca8b9251b393131c08a736a67ccb19297',
    });

    expect(() => decodeChainAddress('2-0x388C818CA8B9251b393131C08a736A67ccB19297')).toThrow('invalid_enum_value');
  });

  test('encodeTokenAddress', () => {
    const tokenAddress = TokenAddress.parse({
      chainId: 8453,
      contractAddress: '0x388c818ca8b9251b393131c08a736a67ccb19297',
      tokenId: '1',
    });

    expect(encodeTokenAddress(tokenAddress)).toMatchInlineSnapshot(
      '"8453-0x388c818ca8b9251b393131c08a736a67ccb19297-1"',
    );
  });

  test('decodeTokenAddress', () => {
    expect(decodeTokenAddress('8453-0x388C818CA8B9251b393131C08a736A67ccB19297-1')).toEqual({
      chainId: 8453,
      contractAddress: '0x388c818ca8b9251b393131c08a736a67ccb19297',
      tokenId: '1',
    });

    expect(() => decodeTokenAddress('2-0x388C818CA8B9251b393131C08a736A67ccB19297-1')).toThrow('invalid_enum_value');
  });

  test('encodeTokenForSimpleHash', () => {
    const tokenAddress = TokenAddress.parse({
      chainId: 8453,
      contractAddress: '0x388c818ca8b9251b393131c08a736a67ccb19297',
      tokenId: '1',
    });

    expect(encodeTokenForSimpleHash(tokenAddress)).toMatchInlineSnapshot(
      '"base.0x388c818ca8b9251b393131c08a736a67ccb19297.1"',
    );
  });
});
