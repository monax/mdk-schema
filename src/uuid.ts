import { uuidv7 } from 'uuidv7';
import * as z from 'zod';
import { Hex } from './hex.js';

export const UUID = z.string().uuid().brand('UUID');

export type UUID = z.infer<typeof UUID>;

export function createUUID(): UUID {
  // Mixed time-ordered/random UUID for better database locality
  return UUID.parse(uuidv7());
}

export function shortenUUID(uuid: UUID): string {
  return `${uuid.slice(0, 6)}...${uuid.slice(-4)}`;
}

export function parseUUIDWithoutDashes(str: string) {
  const uuidParts = str.match(/^([\w]{8})([\w]{4})([\w]{4})([\w]{4})([\w]{12})$/);
  return UUID.safeParse(uuidParts ? uuidParts.slice(1).join('-') : '');
}

export function removeDashes(str: string): string {
  return str.replace(/-/g, '');
}

export const uuidToBytes32 = (uuid: UUID): Hex => {
  return Hex.parse(`0x${removeDashes(uuid).padStart(64, '0')}`);
};

export const bytes32ToUuid = (bytes32: string): UUID => {
  const maybeUUID = parseUUIDWithoutDashes(bytes32.slice(34));
  if (!maybeUUID.success) throw new Error(`Invalid UUID: ${bytes32}`);
  return maybeUUID.data;
};

export const uuidTupleToBytes32 = (uuidA: UUID, uuidB: UUID): Hex => {
  return Hex.parse(`0x${removeDashes(uuidA)}${removeDashes(uuidB)}`);
};

export const bytes32ToUuidTuple = (bytes32: string): [UUID, UUID] => {
  const maybeUUIDA = parseUUIDWithoutDashes(bytes32.slice(2, 34));
  const maybeUUIDB = parseUUIDWithoutDashes(bytes32.slice(34));
  if (!maybeUUIDA.success || !maybeUUIDB.success) throw new Error(`Invalid UUID tuple: ${bytes32}`);
  return [maybeUUIDA.data, maybeUUIDB.data];
};

export function hasIdFilter<Т extends object>(item: Т | (Т & { id: UUID })): item is Т & { id: UUID } {
  return 'id' in item;
}

export function getIdFinder(id: UUID) {
  return <Т extends object>(item: Т | (Т & { id: UUID })): item is Т & { id: UUID } => 'id' in item && item.id === id;
}
