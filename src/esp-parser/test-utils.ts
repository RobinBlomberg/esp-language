import { expect } from 'vitest';
import { Parser } from '../esp-lexer';
import { IR } from '../ir-ast';

export const createParseAssert = <T extends IR.Node>(parse: Parser<T>) => {
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
