import { describe, expect, test } from 'vitest';
import { splitStringToLines } from './string.js';

describe('string', () => {
  test('splitStringToLines', () => {
    // it does not break words
    expect(splitStringToLines('hello world', 3)).toEqual(['hello', 'world']);
    expect(splitStringToLines('hello world', 5)).toEqual(['hello', 'world']);
    expect(splitStringToLines('hello world to a very dear friend', 8)).toEqual([
      'hello',
      'world to',
      'a very',
      'dear',
      'friend',
    ]);
    expect(splitStringToLines('hello world to a very dear friend', 12)).toEqual([
      'hello world',
      'to a very',
      'dear friend',
    ]);
  });
});
