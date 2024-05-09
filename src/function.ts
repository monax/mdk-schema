// biome-ignore lint/suspicious/noExplicitAny: we don't care about the type of the function
export function isFunction<T extends (...args: any[]) => any, U>(value: T | U): value is T {
  return typeof value === 'function';
}
