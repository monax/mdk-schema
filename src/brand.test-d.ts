import { assertType, test } from 'vitest';
import * as z from 'zod';
import { RemoveBranding } from './brand.js';
import { StringInteger } from './string-integer.js';

test('RemoveBranding', () => {
  const Num = z.number().gt(232).brand('Num');
  type Num = z.infer<typeof Num>;

  const BigNum = z.bigint().lt(111n).brand('BigNum');
  type BigNum = z.infer<typeof BigNum>;

  type BrandedType = {
    amount: StringInteger | null | undefined;
    amount2: StringInteger | null;
    amount3: StringInteger;
    num: Num | undefined;
    bigNum: BigNum;
  };

  assertType<RemoveBranding<BrandedType>>({
    amount: '232' as string | null | undefined,
    amount2: null as string | null,
    amount3: 'hello' as string,
    num: 2 as number | undefined,
    bigNum: BigNum.parse(23n),
  });

  // We can customise the primitive to hunt for
  assertType<RemoveBranding<BrandedType, string | number | bigint>>({
    amount: '232' as string | null | undefined,
    amount2: null as string | null,
    amount3: 'hello' as string,
    num: 2 as number | undefined,
    bigNum: 23n,
  });
});
