import type { Numeric } from './numeric.js';

export function max<T extends number | bigint>(t0: T, ...ts: T[]): T {
  return ts.reduce((acc, t) => (t > acc ? t : acc), t0);
}

export function min<T extends number | bigint>(t0: T, ...ts: T[]): T {
  return ts.reduce((acc, t) => (t < acc ? t : acc), t0);
}

export function minmax<T extends number | bigint>(min: T, value: T, max: T) {
  return min < value ? (value < max ? value : max) : min;
}

export const maxN = (first: Numeric, ...rest: Numeric[]): Numeric => {
  return rest.reduce((acc, x) => (x.gt(acc) ? x : acc), first);
};

export const minN = (first: Numeric, ...rest: Numeric[]): Numeric => {
  return rest.reduce((acc, x) => (x.lt(acc) ? x : acc), first);
};

export const minmaxN = (min: Numeric, value: Numeric, max: Numeric): Numeric => {
  return min.lt(value) ? (value.lt(max) ? value : max) : min;
};
