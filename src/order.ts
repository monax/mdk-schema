import * as z from "zod";

export type ShippingAddress = z.infer<typeof ShippingAddress>;
export const ShippingAddress = z.object({
  /**
   * City/District/Suburb/Town/Village.
   */
  city: z.string().optional().nullable(),

  /**
   * 2-letter country code.
   */
  country: z.string().optional().nullable(),

  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  line1: z.string().optional().nullable(),

  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  line2: z.string().optional().nullable(),

  /**
   * ZIP or postal code.
   */
  postal_code: z.string().optional().nullable(),

  /**
   * State/County/Province/Region.
   */
  state: z.string().optional().nullable(),
});
