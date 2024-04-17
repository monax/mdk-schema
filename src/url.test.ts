import { describe, expect, test } from 'vitest';
import { getUrlParams } from './url.js';

describe('getUrlParams', () => {
  test('undefined & normal params', () => {
    expect(getUrlParams({ x: undefined })).toBe('');
    expect(getUrlParams({ x: undefined, z: '1' })).toBe('?z=1');
  });
});
