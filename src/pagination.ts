import * as z from 'zod';
import { max } from './compare.js';
import { UUID } from './uuid.js';

export type ReturnId = z.infer<typeof ReturnId>;
export const ReturnId = z.object({ id: UUID });

export type TimeFrameParams = z.infer<typeof TimeFrameParams>;
export const TimeFrameParams = z.object({
  createdAtFrom: z.coerce.date().optional(),
  createdAtTo: z.coerce.date().optional(),
});

export type PageParams = z.infer<typeof PageParams>;
export const PageParams = z
  .object({
    cursor: z.number().optional(),
    limit: z.number().optional(),
  })
  .transform(({ cursor, limit }) => ({
    cursor: cursor ? max(0, cursor) : undefined,
    limit: limit ? max(1, limit) : undefined,
  }));

export type ExcludePageParams<T> = Omit<T, keyof PageParams>;

export type PagedResult<T> = {
  items: T[];
  nextCursor: number | null;
};

export const makePagedResult = <ItemType extends z.ZodTypeAny>(itemSchema: ItemType) => {
  return z.object({
    items: z.array(itemSchema),
    nextCursor: z.number().nullable(),
  });
};

export const getNextCursor = <T>(items: T[], page: PageParams): number | null => {
  return items.length !== page.limit ? null : (page.cursor ?? 0) + items.length;
};

export function getPagedResult<T>(items: T[], page: PageParams): PagedResult<T> {
  return {
    items,
    nextCursor: getNextCursor(items, page),
  };
}
