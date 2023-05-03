import { expect } from 'vitest';
import { Node } from '../esp-grammar/ast';
import { Parser } from '../esp-lexer';

export const createParseAssert = <T extends Node>(parse: Parser<T>) => {
  return {
    error: (data: string) => {
      expect(parse(data, 0)).toMatchObject({ abrupt: 'Error' });
    },
    ok: (data: string) => {
      expect(parse(data, 0)).toMatchObject({ type: expect.anything() });
    },
    throws: (data: string) => {
      expect(() => parse(data, 0)).toThrow(ReferenceError);
    },
    unused: () => {
      expect(parse(' ', 0)).toMatchObject({ abrupt: 'Unused' });
    },
  };
};
