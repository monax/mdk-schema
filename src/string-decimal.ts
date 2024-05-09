import type * as z from "zod";
import { Numeric } from "./numeric.js";
import type {} from "bigdecimal";

export type StringDecimal = z.infer<typeof StringDecimal>;
export const StringDecimal = Numeric.transform((v) => v.toString()).brand(
  "StringDecimal",
);

export type PositiveStringDecimal = z.infer<typeof PositiveStringDecimal>;
export const PositiveStringDecimal = Numeric.refine(
  (v) => v.gte(0),
  "invalid_positive_decimal_string",
)
  .transform((v) => v.toString())
  .brand("PositiveStringDecimal");
