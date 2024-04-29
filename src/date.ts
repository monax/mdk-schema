import { addMinutes, format as formatDateFn, fromUnixTime, parseISO } from 'date-fns';
import { z } from 'zod';

// the special syntax at the end makes intellisense auto-complete work while keeping TS happy
// inspired by Chakra's `Union` type
export type DateFormat = 'short' | 'long' | (string & NonNullable<unknown>);

export type DateFormats = typeof DateFormats;
export const DateFormats: Partial<Record<DateFormat, string>> = {
  short: 'PP',
  long: 'PPpp',
};

export const formatDate = (date?: Date | string | number, format: DateFormat = 'long'): string => {
  let parsedDate: Date | null = null;

  if (date instanceof Date) {
    parsedDate = date as Date;
  } else if (typeof date === 'string') {
    if (z.coerce.number().safeParse(date).success) parsedDate = fromUnixTime(parseInt(date));
    else parsedDate = parseISO(date);
  } else if (typeof date === 'number') {
    parsedDate = fromUnixTime(date);
  }

  if (!parsedDate) return '';

  parsedDate = addMinutes(parsedDate, parsedDate.getTimezoneOffset());
  return formatDateFn(parsedDate, DateFormats[format] ?? format);
};
