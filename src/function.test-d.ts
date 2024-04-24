import { describe, expectTypeOf, test } from 'vitest';
import { isFunction } from './function.js';

describe('Function', () => {
  test('isFunction', () => {
    let val: boolean | ((x: number) => boolean);

    if (Math.random() > 0.5) {
      val = () => true;
    } else {
      val = Math.random() > 0.5;
    }

    if (isFunction(val)) {
      expectTypeOf(val).toEqualTypeOf<(x: number) => boolean>();
    } else {
      expectTypeOf(val).toEqualTypeOf<boolean>();
    }
  });
});
