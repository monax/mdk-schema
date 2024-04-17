import * as z from 'zod';

type Flip<T extends Record<string, string | number>> = {
  [K in keyof T as T[K]]: K;
};

const ChainMap = {
  Mainnet: 1,
  Goerli: 5,
  Polygon: 137,
  Mumbai: 80001,
  Base_Mainnet: 8453,
  Base_Goerli: 84531,
} as const;

export type ChainId = z.infer<typeof ChainId>;
export const ChainId = z.nativeEnum(ChainMap);

export type ChainName = z.infer<typeof ChainName>;
export const ChainName = z.nativeEnum(
  Object.fromEntries(Object.entries(ChainMap).map(([k, v]) => [v, k])) as Flip<typeof ChainMap>,
);

export type SupportedNetwork = z.infer<typeof SupportedNetwork>;
export const SupportedNetwork = ChainName;

const SimpleHashChainMap = {
  ethereum: ChainMap.Mainnet,
  'ethereum-goerli': ChainMap.Goerli,
  polygon: ChainMap.Polygon,
  'polygon-mumbai': ChainMap.Mumbai,
  base: ChainMap.Base_Mainnet,
  'base-goerli': ChainMap.Base_Goerli,
} as const;

export type SimpleHashChainId = typeof SimpleHashChainId;
export const SimpleHashChainId = z.nativeEnum(SimpleHashChainMap);

export type SimpleHashChainName = typeof SimpleHashChainName;
export const SimpleHashChainName = z.nativeEnum(
  Object.fromEntries(Object.entries(SimpleHashChainMap).map(([k, v]) => [v, k])) as Flip<typeof SimpleHashChainMap>,
);
