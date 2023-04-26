import { expect } from 'vitest';
import { Parser } from '../esp-lexer';
import { Node } from './ast';

export const createParseAssert = <T extends Node>(parse: Parser<T>) => {
  return {
    error: (data: string) => {
      expect(parse(data, 0).type).toBe('Error');
    },
    ok: (data: string) => {
      expect(parse(data, 0).type).not.toBe('Error');
      expect(parse(data, 0).type).not.toBe('Unused');
    },
    throws: (data: string) => {
      expect(() => parse(data, 0)).toThrow(ReferenceError);
    },
    unused: () => {
      expect(parse(' ', 0).type).toBe('Unused');
    },
  };
};
