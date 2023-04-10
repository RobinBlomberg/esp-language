import { lex } from './lex';
import { Token, TokenMatcher } from './token';
import { TokenType } from './token-type';

export type Parser<T> = (data: string, start: number) => T | null;

export const consume = <T extends TokenType, V extends string = string>(
  data: string,
  start: number,
  type: T,
  value?: V,
): Token<T, V> | null => {
  const token = lex(data, start);
  return match(token, type, value) ? token : null;
};

export const consumeToken = <T extends TokenMatcher>(
  data: string,
  start: number,
  expected: T | T[],
): Token<T['type'], T['value']> | null => {
  const token = lex(data, start);
  return matchToken(token, expected) ? token : null;
};

export const match = <T extends TokenType, V extends string = string>(
  token: Token | null,
  type: T,
  value?: V,
): token is Token<T, V> => {
  return (
    token !== null &&
    token.type === type &&
    (value === undefined || token.value === value)
  );
};

export const matchToken = <T extends TokenMatcher>(
  actual: Token | null,
  expected: T | T[],
): actual is Token<T['type'], T['value']> => {
  if (Array.isArray(expected)) {
    for (const expectedToken of expected) {
      if (
        actual !== null &&
        actual.type === expectedToken.type &&
        actual.value === expectedToken.value
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    actual !== null &&
    actual.type === expected.type &&
    actual.value === expected.value
  );
};
