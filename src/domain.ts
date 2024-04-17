import * as z from 'zod';

export type Subdomain = z.infer<typeof Subdomain>;
export const Subdomain = z
  .string()
  .regex(/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/, "Invalid subdomain")
  .brand("Subdomain");
