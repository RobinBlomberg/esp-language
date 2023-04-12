import { expect } from 'vitest';
import { Node } from './ast';

export const createParseAssert = <T extends Node>(
  parse: (data: string, i: number) => T | null,
) => {
  const fail = (data: string) => {
    expect(parse(data, 0)).toBeNull();
  };

  const ok = (data: string) => {
    expect(parse(data, 0)).not.toBeNull();
  };

  const throws = (data: string) => {
    expect(() => parse(data, 0)).toThrow(SyntaxError);
  };

  return { fail, ok, throws };
};
