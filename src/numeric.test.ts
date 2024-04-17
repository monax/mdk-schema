import { Big } from 'bigdecimal.js';
import { describe, expect, test } from 'vitest';
import { Numeric } from './numeric.js';

describe('Numeric', () => {
  test('Acceptance of BigDecimal inputs', () => {
    const twelve = Big(12);
    expect(Numeric.parse(12).equals(twelve)).to.be.true;
    expect(Numeric.parse(twelve).equals(twelve)).to.be.true;
    expect(Numeric.parse(Big(11)).equals(twelve)).to.not.be.true;
  });

  test('Numeric string parsing', () => {
    expect(() => Numeric.parse('hello')).toThrow('invalid_numeric');
  });
});
