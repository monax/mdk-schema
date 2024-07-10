import { assertType, describe, expectTypeOf, test } from 'vitest';
import type { RequireOptional, RequireOptionalDeep, UndefinedAsOptional } from './type-helpers.js';

describe('optional', () => {
  test('UndefinedAsOptional', () => {
    type Foo = UndefinedAsOptional<{
      a: string;
      b: string | undefined;
      c: number | undefined;
    }>;
    assertType<Foo>({
      a: 'asd',
      c: undefined,
    });

    type Foo2 = UndefinedAsOptional<{
      a: string;
    }>;
    assertType<Foo2>({
      a: 'asd',
    });
  });

  test('RequireOptional', () => {
    const val: RequireOptional<{ a: string; b: string | undefined; c: { d: string | undefined } | undefined }> = {
      a: 'asd',
      b: 'asd',
      c: { d: undefined },
    };

    expectTypeOf(val).toEqualTypeOf<{ a: string; b: string; c: { d: string | undefined } }>();
  });

  test('RequireOptionalDeep', () => {
    const val: RequireOptionalDeep<{ a: string; b: string | undefined; c: { d: string | undefined } }> = {
      a: 'asd',
      b: 'asd',
      c: { d: 'asd' },
    };

    expectTypeOf(val).toEqualTypeOf<{ a: string; b: string; c: { d: string } }>();
  });
});
