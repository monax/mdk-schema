import { Big, MathContext, RoundingMode } from 'bigdecimal.js';
import { describe, expect, test } from 'vitest';
import {
  Price,
  SupportedCurrency,
  formatPriceDisplay,
  getPercentAmount,
  isSamePrice,
  sumPrices,
  toMajorDenomination,
  toMinorDenomination,
} from './price.js';
import { StringDecimal } from './string-decimal.js';

const USD = SupportedCurrency.Values.USD;

// Documenting quirky behavior of BigDecimal library
describe('BigDecimal', () => {
  test('Rounding', () => {
    // Note - this is a quirk of the BigDecimal library: it rounds the entire number to the given precision of meaningful digits
    expect(Big('1234.5678').round(new MathContext(6, RoundingMode.FLOOR)).toString()).toBe('1234.56');
    // .setScale is what we want instead for rounding to a given number of decimal places after the decimal point
    expect(Big('1234.5678').setScale(2, RoundingMode.FLOOR).toString()).toBe('1234.56');
  });
});

describe('Price', () => {
  test('Extra digits are trimmed in price', () => {
    expect(Price.parse({ amount: '1.2345', currency: USD })).toStrictEqual({ amount: '1.23', currency: USD });
  });
});

describe('Denomination', () => {
  test('toMajorDenomination', () => {
    expect(toMajorDenomination(StringDecimal.parse('1'), USD)).toBe('0.01');

    // we can't convert to major denomination if the number is not an integer
    expect(() => toMajorDenomination(StringDecimal.parse('1.23'), USD)).toThrow('Rounding necessary');
  });

  test('toMinorDenomination', () => {
    expect(toMinorDenomination(StringDecimal.parse('1'), USD)).toBe('100');
    expect(toMinorDenomination(StringDecimal.parse('1.23'), USD)).toBe('123');

    // we are guaranteed that the output is a valid integer
    expect(() => toMinorDenomination(StringDecimal.parse('1.234'), USD)).toThrow('Rounding necessary');
  });
});

describe('isSamePrice', () => {
  test('amount comparison', () => {
    const a = Price.parse({ amount: '123.45', currency: USD });

    // dummy testing comparison with number, which should be transformed to string
    const b = Price.parse({ amount: 123.45, currency: USD });
    expect(isSamePrice(a, b)).toBe(true);

    // different notation should not affect the transformation
    const c = Price.parse({ amount: '1.2345e2', currency: USD });
    expect(isSamePrice(a, c)).toBe(true);

    // extra digits are trimmed
    const d = Price.parse({ amount: '1.23456789e2', currency: USD });
    expect(isSamePrice(a, d)).toBe(true);
  });
});

describe('formatPriceDisplay', () => {
  test('no decimals', () => {
    const price = Price.parse({
      amount: '100',
      currency: 'USD',
    });
    expect(formatPriceDisplay(price)).toBe('$100');
  });

  test('with decimals', () => {
    const price = Price.parse({
      amount: '100.99',
      currency: 'USD',
    });
    expect(formatPriceDisplay(price)).toBe('$100.99');
  });
});

describe('sumPrices', () => {
  test('no prices - throws', () => {
    expect(() => sumPrices([])).toThrowError('Cannot sum an empty list of prices');
  });

  test('1 price', () => {
    const price = Price.parse({
      amount: '100.99',
      currency: 'USD',
    });
    expect(sumPrices([price])).toEqual(price);
  });

  test('multiple prices', () => {
    const price1 = Price.parse({
      amount: '100',
      currency: 'USD',
    });
    const price2 = Price.parse({
      amount: '150.99',
      currency: 'USD',
    });
    expect(sumPrices([price1, price2])).toEqual(
      Price.parse({
        amount: '250.99',
        currency: 'USD',
      }),
    );
  });
});

describe('getPercentAmount', () => {
  test('no decimals', () => {
    expect(getPercentAmount(100.14, 1000, 0)).toBe(10);
  });

  test('with decimals', () => {
    expect(getPercentAmount(100.14, 1000)).toBe(10.01);
  });

  // we don't perform rounding, but floor
  test('rounding', () => {
    expect(getPercentAmount(100.19, 1000)).toBe(10.01);
  });
});
