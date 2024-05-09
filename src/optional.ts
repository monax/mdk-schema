export type Optional<T> = { [K in keyof T]: T[K] | undefined };

// Distribute U to form one function per element then infer in function to induce intersection type in I
// biome-ignore lint/suspicious/noExplicitAny: we don't care about the type
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UndefinedAsOptional<T> = UnionToIntersection<
  {
    [K in keyof T]: undefined extends T[K] ? { [k in K]?: NonNullable<T[k]> } : { [k in K]: T[k] };
  }[keyof T]
>;
