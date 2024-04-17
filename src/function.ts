export function isFunction<T extends (...args: unknown[]) => unknown, U>(value: T | U): value is T {
  return typeof value === 'function';
}
