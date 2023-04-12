import { expect } from 'vitest';
import { Node } from './ast';

export const createParseAssert = <T extends Node>(
  parse: (data: string, i: number) => T | null,
) => ({
  fail: (data: string) => {
    expect(parse(data, 0)).toBeNull();
  },
  ok: (data: string, expected?: T) => {
    if (expected === undefined) {
      expect(parse(data, 0)).not.toBeNull();
    } else {
      expect(parse(data, 0)).toEqual(expected);
    }
  },
  throws: (data: string) => {
    expect(() => parse(data, 0)).toThrow(SyntaxError);
  },
});
