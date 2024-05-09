import { Big, RoundingMode } from 'bigdecimal.js';
import * as z from 'zod';
import { PositiveStringDecimal, type StringDecimal } from './string-decimal.js';

export type SupportedCurrency = z.infer<typeof SupportedCurrency>;
export const SupportedCurrency = z.enum(['USD']);

// Please switch to using `currency-codes` NPM package if you need more currencies
// https://www.npmjs.com/package/currency-codes
export const CURRENCY_DECIMALS: Record<SupportedCurrency, number> = {
  USD: 2,
};

export type Price = z.infer<typeof Price>;
export const Price = z
  .object({
    currency: SupportedCurrency,
    amount: PositiveStringDecimal,
  })
  .transform((price) => {
    return {
      currency: price.currency,
      // .setScale performs the rounding that we'd normaly expect from .round
      // see tests for more details
      amount: Big(price.amount)
        .setScale(CURRENCY_DECIMALS[price.currency], RoundingMode.FLOOR)
        .toString() as PositiveStringDecimal,
    };
  });

/** Converts cents to dollars */
export function toMajorDenomination<T extends StringDecimal | PositiveStringDecimal>(
  amount: T,
  currency: SupportedCurrency,
): T {
  const val = Big(amount);
  val.toBigIntExact(); // ensures that the value is an integer
  return val.divide(10 ** CURRENCY_DECIMALS[currency]).toString() as T;
}

/** Converts dollars to cents */
export function toMinorDenomination<T extends StringDecimal | PositiveStringDecimal>(
  amount: T,
  currency: SupportedCurrency,
): T {
  return Big(amount)
    .multiply(10 ** CURRENCY_DECIMALS[currency])
    .toBigIntExact()
    .toString() as T;
}

// Note: every parsed price will have its amount transformed by `Big` so it is safe to compare them as strings
export function isSamePrice(a: Price, b: Price): boolean {
  return a.currency === b.currency && a.amount === b.amount;
}

export function isLowerPrice(a: Price, b: Price): boolean {
  if (a.currency !== b.currency) throw new Error('Cannot compare prices with different currencies');

  return Big(a.amount).lt(b.amount);
}

export const parsePrice = (amount: string | number, currency: SupportedCurrency): Price => {
  return Price.parse({
    amount: amount.toString(),
    currency,
  });
};

export const formatPrice = (price: Price): number => {
  return Number.parseFloat(price.amount);
};

export const sumPrices = (prices: Price[]): Price => {
  if (prices.length === 0) throw new Error('Cannot sum an empty list of prices');
  const uniqueCurrencies = new Set(prices.map((price) => price.currency));
  if (uniqueCurrencies.size > 1) throw new Error('Cannot sum prices with different currencies');
  return parsePrice(
    prices.reduce((acc, price) => acc + formatPrice(price), 0),
    prices[0].currency,
  );
};

export const formatPriceDisplay = (price: Price, minimumDigits?: number): string => {
  const amount = formatPrice(price);

  // We might need a better strategy here for crypto currencies

  if (amount % 1 === 0)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: minimumDigits ?? 0,
      maximumFractionDigits: minimumDigits ?? 0,
    }).format(amount);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: minimumDigits ?? 2,
  }).format(amount);
};

/** The amount is floored at the number of decimals specified */
export const getPercentAmount = (amount: number, bps: number, decimals = 2): number => {
  const scale = 10 ** Math.max(0, decimals);
  return Math.floor((amount * bps * scale) / 10000) / scale;
};
