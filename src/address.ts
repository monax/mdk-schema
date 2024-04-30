import * as z from 'zod';
import { ChainId, SimpleHashChainName } from './chain.js';
import { mockHex } from './hex.js';
import { StringInteger } from './string-integer.js';

// The database expects all addresses to be normalised to lowercase so for now we will normalise to lower
// case here. At the presentation layer known-good addresses should be checksummed, and any user-input addresses
// should have any checksum verified
export const Address = z
  .string()
  .transform((s) => s.toLowerCase())
  .pipe(z.string().regex(/^0x[a-f0-9]{40}$/))
  .pipe(z.custom<`0x${string}`>())
  .brand('Address');

export type Address = z.infer<typeof Address>;

export function isSameAddress(a: string, b: string): boolean {
  return Address.parse(a) === Address.parse(b);
}

export const ADDRESS_DELIMITER = '-';

export type ChainAddress = z.infer<typeof ChainAddress>;
export const ChainAddress = z.object({
  chainId: ChainId,
  address: Address,
});

export function encodeChainAddress(chainAddress: ChainAddress): string {
  return [chainAddress.chainId, chainAddress.address].join(ADDRESS_DELIMITER);
}

export function decodeChainAddress(chainAddress: string): ChainAddress {
  const [chainId, address] = chainAddress.split(ADDRESS_DELIMITER);
  return ChainAddress.parse({ chainId: parseInt(chainId, 10), address });
}

export type TokenAddress = z.infer<typeof TokenAddress>;
export const TokenAddress = z.object({
  chainId: ChainId,
  contractAddress: Address,
  tokenId: StringInteger,
});

export function encodeTokenAddress(token: TokenAddress): string {
  return [token.chainId, token.contractAddress, token.tokenId].join(ADDRESS_DELIMITER);
}

export function decodeTokenAddress(tokenAddress: string): TokenAddress {
  const [chainId, contractAddress, tokenId] = tokenAddress.split(ADDRESS_DELIMITER);
  return TokenAddress.parse({ chainId: parseInt(chainId, 10), contractAddress, tokenId });
}

export function encodeTokenForSimpleHash(token: TokenAddress): string {
  const chainName = SimpleHashChainName.enum[token.chainId];
  return `${chainName}.${token.contractAddress}.${token.tokenId}`;
}

export const mockAddress = (): Address => {
  return Address.parse(mockHex(40));
};
