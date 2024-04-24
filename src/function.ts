/* eslint-disable @typescript-eslint/no-explicit-any */
export function isFunction<T extends (...args: any[]) => any, U>(value: T | U): value is T {
  return typeof value === 'function';
}
