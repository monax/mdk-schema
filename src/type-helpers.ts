export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type NonNullableProp<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

export type Optional<T> = { [K in keyof T]: T[K] | undefined };

// Distribute U to form one function per element then infer in function to induce intersection type in I
// biome-ignore lint/suspicious/noExplicitAny: we don't care about the type
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UndefinedAsOptional<T> = UnionToIntersection<
  {
    [K in keyof T]: undefined extends T[K] ? { [k in K]?: NonNullable<T[k]> } : { [k in K]: T[k] };
  }[keyof T]
>;

export type RequireOptional<T> = Prettify<{
  [K in keyof T]-?: NonNullable<T[K]>;
}>;

export type RequireOptionalDeep<T> = Prettify<{
  [K in keyof T]-?: T[K] extends object ? RequireOptionalDeep<T[K]> : NonNullable<T[K]>;
}>;

export type PrefixProps<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
} & unknown;
