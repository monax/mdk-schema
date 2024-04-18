// First distribute over primitives P, then distribute over each element of potential union T testing if it narrows
// P_i, if so replacing it with P_i
// nevers are the empty set so are removed from final union
type PrimitiveDebrand<T, P> = P extends P ? (T extends P ? P : never) : never;

// Replaces any branded or narrow types that extend some primitive type with the primitive type
export type RemoveBranding<T, P = number | string | boolean> = T extends P
  ? PrimitiveDebrand<T, P>
  : T extends object
    ? { [K in keyof T]: RemoveBranding<T[K], P> }
    : T;
