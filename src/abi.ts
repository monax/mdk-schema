// biome-ignore lint/style/useNodejsImportProtocol: polyfill
import { Buffer } from 'buffer';
import { type Hex, encodeAbiParameters } from 'viem';

export function bytes32String(str: string): Hex {
  const buf = Buffer.from(str);
  if (buf.length > 32) {
    throw new Error(`string ${str} is too long to be a bytes32`);
  }
  const buf32 = Buffer.alloc(32);
  buf.copy(buf32);
  return encodeAbiParameters([{ type: 'bytes32' }], [`0x${buf32.toString('hex')}`]);
}
