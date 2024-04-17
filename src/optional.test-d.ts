import { assertType, describe, test } from 'vitest';
import { UndefinedAsOptional } from './optional.js';

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
});
