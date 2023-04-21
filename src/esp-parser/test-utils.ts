import { expect } from 'vitest';
import { Node } from './ast';

export const createParseAssert = <T extends Node>(
  parse: (data: string, i: number) => T | null,
) => {
  return {
    fail: (data: string) => {
      expect(parse(data, 0)).toBeNull();
    },
    ok: (data: string) => {
      expect(parse(data, 0)).not.toBeNull();
    },
    throws: (data: string) => {
      expect(() => parse(data, 0)).toThrow(SyntaxError);
    },
  };
};
