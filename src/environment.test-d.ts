import { describe, expectTypeOf, test } from 'vitest';
import * as z from 'zod';
import { getConfigBag } from './environment.js';

describe('Environment', () => {
  test('getConfigBag', () => {
    const schemas = {
      PROP_1: z.string().optional(),
      PROP_2: z.string(),
      PROP_3: z.number(),
    };
    type Foo = {
      PROP_1: string | undefined;
      PROP_2: string;
      PROP_3: number;
    };

    expectTypeOf(getConfigBag(schemas)).toEqualTypeOf<Foo>();
  });
});
