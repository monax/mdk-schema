export type Optional<T> = { [K in keyof T]: T[K] | undefined };

// Distribute U to form one function per element then infer in function to induce intersection type in I
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UndefinedAsOptional<T> = UnionToIntersection<
  {
    [K in keyof T]: undefined extends T[K] ? { [k in K]?: NonNullable<T[k]> } : { [k in K]: T[k] };
  }[keyof T]
>;
