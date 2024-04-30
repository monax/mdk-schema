export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type NonNullableProp<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;
