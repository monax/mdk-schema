import { describe, expect, test } from 'vitest';
import * as z from 'zod';
import { getConfigBag } from './environment.js';

describe('Environment', () => {
  test('getConfigBag', () => {
    const schemas = {
      SUBDOMAIN_1: z.string().optional(),
      SUBDOMAIN_2: z.string().optional(),
    };

    const config = getConfigBag(schemas);
    expect(config).toStrictEqual({ SUBDOMAIN_1: undefined, SUBDOMAIN_2: undefined });
  });
});
