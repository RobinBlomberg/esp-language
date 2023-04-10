import { expect } from 'vitest';
import { Node } from './nodes';

export const createParseAssert = <T extends Node>(
  parse: (data: string, i: number) => T | null,
) => ({
  fail: (data: string) => {
    expect(parse(data, 0)).toBeNull();
  },
  ok: (data: string, expected: T) => {
    expect(parse(data, 0)).toEqual(expected);
  },
});
