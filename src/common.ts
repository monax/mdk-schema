import * as z from 'zod';
import { UUID } from './uuid.js';

export const DEFAULT_PAGE_PARAMS: Required<PageParams> = {
  cursor: 0,
  limit: 100,
};

export type TimeFrameParams = z.infer<typeof TimeFrameParams>;
export const TimeFrameParams = z.object({
  createdAtFrom: z.coerce.date().optional(),
  createdAtTo: z.coerce.date().optional(),
});

export type PageParams = z.infer<typeof PageParams>;
export const PageParams = z.object({
  // cursor is the offset, but we need to name it cursor for the sake of the trpc infinate queries to work
  // https://trpc.io/docs/client/react/useInfiniteQuery
  cursor: z.number().min(0).optional(),
  limit: z.number().max(100),
});

export const makePagedResult = <ItemType extends z.ZodTypeAny>(itemSchema: ItemType) => {
  return z.object({
    items: z.array(itemSchema),
    nextCursor: z.number().nullable(),
  });
};

export type ReturnId = z.infer<typeof ReturnId>;
export const ReturnId = z.object({ id: UUID });
