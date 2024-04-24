import * as z from 'zod';
import { isFunction } from './function.js';
import { UndefinedAsOptional } from './optional.js';

export type NodeEnv = z.infer<typeof NodeEnv>;
export const NodeEnv = z.enum(['test', 'local', 'dev', 'staging', 'production', 'development']);

// preserve intellisense with this type
// eslint-disable-next-line @typescript-eslint/ban-types
export type Stack = 'local' | 'dev' | 'staging' | 'production' | (string & {});
export const Stack = z.string();

export type LogLevel = z.infer<typeof LogLevel>;
export const LogLevel = z.enum(['trace', 'debug', 'warn', 'crit']);

export const node = { NODE_ENV: NodeEnv, LOG_LEVEL: LogLevel, STACK: Stack } as const;
export type Node = typeof node;

export function getNodeEnv(): NodeEnv {
  return NodeEnv.parse(mustEnv('NODE_ENV'));
}

export function isDevOrTestEnv(nodeEnv: NodeEnv): boolean {
  return nodeEnv === 'local' || nodeEnv === 'development' || nodeEnv === 'dev' || nodeEnv === 'test';
}

export function mustEnv(key: string, ...unless: NodeEnv[]): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const optional = unless.includes((globalThis as any).process?.env?.NODE_ENV as NodeEnv);
  const value = getEnv(key, optional ? '' : undefined);
  if (value === undefined) throw new Error(`Environment variable ${key} not set`);
  return value;
}

export function getEnv(key: string, defaultValue?: string | (() => string)): string | undefined {
  return liftEnv(key, (s) => s, defaultValue);
}

export function liftEnv<T>(key: string, lift: (s: string) => T, defaultValue?: T | (() => T)): T | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = (globalThis as any).process?.env?.[key];
  if (!value) {
    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  }
  try {
    return lift(value);
  } catch (err) {
    console.log(`Error parsing environment variable ${key} from value: ${value}`);
    throw err;
  }
}

type EnvVarKey = string;

export type AnyEnvVar<V extends EnvVarKey> = readonly V[] | Partial<Record<V, unknown>>;
export type TypeOf<T extends EnvVarKey, S extends Record<T, z.ZodType>> = z.infer<S[T]>;

export type ConfigBag<S extends Record<string, z.ZodType>> = {
  [K in keyof S]: z.infer<S[K]>;
};

const getEnvVal = <V extends EnvVarKey, S extends Record<V, z.ZodType>, T = TypeOf<V, S>>(
  envVar: V,
  schemas: S,
  defaultValue?: T | (() => T),
): T => {
  const schema = schemas[envVar];
  if (!schema) throw new Error(`No schema for env var ${envVar}`);
  return liftEnv(envVar, (s) => schema.parse(s), defaultValue);
};

export type ConfigSpec<T extends Record<EnvVarKey, z.ZodType>> = UndefinedAsOptional<ConfigBag<T>>;

export function getEnvVars<T extends EnvVarKey>(...ts: AnyEnvVar<T>[]): T[] {
  return ts.flatMap((t) => (Array.isArray(t) ? t : Object.keys(t)));
}

export function getConfigBag<S extends Record<string, z.ZodType>>(schema: S): ConfigBag<S> {
  const vars = Array.from(getEnvVars(schema));
  return vars.reduce((p, c) => ({ ...p, [c]: getEnvVal(c, schema) }), Object.fromEntries(vars.map((e) => [e])));
}

export type Bags<K extends string, V extends string> = { [k in K]: Bags<K, V> } | { [k in V]: z.ZodTypeAny };

type FlattenBags<T> =
  T extends Record<string, z.ZodTypeAny> ? T : T extends Record<infer K, unknown> ? FlattenBags<T[K]> : never;

type AllKeys<T> = T extends T ? keyof T : never;

export type BagKeys<T> = AllKeys<FlattenBags<T>>;

export type OptionalEnvVarKeys<S> =
  S extends Record<infer Keys, z.ZodType>
    ? {
        [K in Keys]: S[K] extends { _def: { typeName: z.ZodFirstPartyTypeKind.ZodOptional } } ? K : never;
      }[Keys]
    : never;

export type RequiredEnvVarKeys<S> =
  S extends Record<infer Keys, z.ZodType> ? Exclude<Keys, OptionalEnvVarKeys<S>> : never;

export function getOptionalEnvVarKeys<S extends Record<EnvVarKey, z.ZodType>>(schemas: S): Set<OptionalEnvVarKeys<S>> {
  return Object.freeze(
    new Set(
      Object.entries(schemas)
        .filter(([, s]) => s.isOptional())
        .map(([k]) => k as OptionalEnvVarKeys<S>),
    ),
  );
}

export function getRequiredEnvVarKeys<S extends Record<EnvVarKey, z.ZodType>>(schemas: S): Set<RequiredEnvVarKeys<S>> {
  return Object.freeze(
    new Set(
      Object.entries(schemas)
        .filter(([, s]) => !s.isOptional())
        .map(([k]) => k as RequiredEnvVarKeys<S>),
    ),
  );
}
