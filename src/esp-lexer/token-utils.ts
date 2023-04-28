import { Abrupt, error } from './abrupt';
import { lex } from './lex';
import { Token, TokenMatcher } from './token';
import { TokenType } from './token-type';

export type Parser<T = { type: string }> = (
  data: string,
  i: number,
) => T | Abrupt;

export const abrupt = (token: {} | { type: string }): token is Abrupt => {
  return (token as any)?.type === 'Error' || (token as any)?.type === 'Unused';
};

export const consume = <T extends TokenType, V extends string = string>(
  data: string,
  i: number,
  type: T,
  value?: V,
): Token<T, V> | Abrupt => {
  const token = lex(data, i);
  if (abrupt(token)) return token;
  return match(token, type, value) ? token : error(token);
};

export const consumeToken = <T extends TokenMatcher>(
  data: string,
  i: number,
  expected: T,
): (T extends TokenMatcher<infer V> ? Token<TokenType, V> : never) | Abrupt => {
  const token = lex(data, i);
  if (abrupt(token)) return token;
  return matchToken(token, expected) ? token : error(token);
};

export const match = <T extends TokenType, V extends string = string>(
  token: Token,
  type: T | T[],
  value?: V,
): token is Token<T, V> => {
  return (
    (token.type === type ||
      (Array.isArray(type) && type.includes(token.type as T))) &&
    (value === undefined || token.value === value)
  );
};

export const matchToken = <T extends TokenMatcher>(
  actual: Token,
  expected: T,
): actual is T extends TokenMatcher<infer V> ? Token<TokenType, V> : never => {
  return Boolean(expected[actual.type]?.includes(actual.value));
};
