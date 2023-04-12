import { expect } from 'vitest';
import { Node } from './ast';

export const createParseAssert = <T extends Node>(
  parse: (data: string, i: number) => T | null,
) => {
  const fail = (data: string) => {
    expect(parse(data, 0)).toBeNull();
  };

  const failAllSubstrings = (data: string, startIndex = 0) => {
    for (let i = startIndex; i < data.length; i++) {
      expect(parse(data.slice(0, i), 0)).toBeNull();
    }
  };

  const ok = (data: string, expected?: T) => {
    if (expected === undefined) {
      expect(parse(data, 0)).not.toBeNull();
    } else {
      expect(parse(data, 0)).toEqual(expected);
    }
  };

  const throws = (data: string) => {
    expect(() => parse(data, 0)).toThrow(SyntaxError);
  };

  return { fail, failAllSubstrings, ok, throws };
};
