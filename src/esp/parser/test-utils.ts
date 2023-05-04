import { expect } from 'vitest';
import { Node } from '../grammar';
import { Parser } from '../lexer';

export const createParseAssert = <T extends Node>(parse: Parser<T>) => {
  return {
    error: (data: string) => {
      expect(parse(data, 0)).toMatchObject({ abrupt: 'Error' });
    },
    ok: (data: string) => {
      expect(parse(data, 0)).toMatchObject({
        start: 0,
        end: data.length,
        type: expect.anything(),
      });
    },
    throws: (data: string) => {
      expect(() => parse(data, 0)).toThrow(ReferenceError);
    },
    unused: () => {
      expect(parse(' ', 0)).toMatchObject({ abrupt: 'Unused' });
    },
  };
};
