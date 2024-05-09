import { Buffer } from 'buffer/index.js';
import {
  type Abi,
  type DecodeEventLogReturnType,
  type Hex,
  type InferEventName,
  type Log,
  decodeEventLog,
  encodeAbiParameters,
  getEventSelector,
} from 'viem';

export function bytes32String(str: string): Hex {
  const buf = Buffer.from(str);
  if (buf.length > 32) {
    throw new Error(`string ${str} is too long to be a bytes32`);
  }
  const buf32 = Buffer.alloc(32);
  buf.copy(buf32);
  return encodeAbiParameters([{ type: 'bytes32' }], [`0x${buf32.toString('hex')}`]);
}

export function extractEventFromLogs<TAbi extends Abi, TEventName extends string>(
  abi: TAbi,
  name: InferEventName<TAbi, TEventName>,
  logs: Log[],
): DecodeEventLogReturnType<TAbi, TEventName>[] {
  const eventAbi = abi.find(
    (x): x is TAbi[number] & { type: 'event'; name: TEventName } => x.type === 'event' && x.name === name,
  );
  if (!eventAbi) {
    throw new Error(`event ${name} not found in abi`);
  }
  return logs
    .filter((l) => l.topics[0] === getEventSelector(eventAbi))
    .map((l) => decodeEventLog({ abi, eventName: name, topics: l.topics, data: l.data }));
}
