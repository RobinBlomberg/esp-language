import { lex } from './lex';
import { Token, TokenMatcher } from './token';
import { TokenType } from './token-type';

export type Parser<T> = (data: string, i: number) => T | null;

export const consume = <T extends TokenType, V extends string = string>(
  data: string,
  i: number,
  type: T,
  value?: V,
): Token<T, V> | null => {
  const token = lex(data, i);
  return match(token, type, value) ? token : null;
};

export const consumeToken = <T extends TokenMatcher>(
  data: string,
  i: number,
  expected: T,
): (T extends TokenMatcher<infer V> ? Token<TokenType, V> : never) | null => {
  const token = lex(data, i);
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
  expected: T,
): actual is T extends TokenMatcher<infer V> ? Token<TokenType, V> : never => {
  return actual === null
    ? false
    : !!expected[actual.type]?.includes(actual.value);
};
