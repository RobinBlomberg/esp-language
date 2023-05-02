import { Keyword, Punctuator } from '../esp-grammar';
import { Abrupt, error } from './abrupt';
import { lex } from './lex';
import { Token, TokenMatcher } from './token';
import { TokenType } from './token-type';

export type Parser<T = { type: string }> = (
  data: string,
  i: number,
) => T | Abrupt;

export type TokenValue<T extends TokenType> = T extends TokenType.Identifier
  ? string
  : T extends TokenType.Keyword
  ? Keyword
  : T extends TokenType.Number
  ? string
  : T extends TokenType.Punctuator
  ? Punctuator
  : T extends TokenType.String
  ? string
  : never;

export const consume = <
  T extends TokenType,
  V extends TokenValue<T> = TokenValue<T>,
>(
  data: string,
  i: number,
  type: T,
  value?: V,
): Token<T, V> | Abrupt => {
  const token = lex(data, i);
  if (token.abrupt) return token;
  return match(token, type, value) ? token : error(token);
};

export const consumeToken = <T extends TokenMatcher>(
  data: string,
  i: number,
  expected: T,
): (T extends TokenMatcher<infer V> ? Token<TokenType, V> : never) | Abrupt => {
  const token = lex(data, i);
  if (token.abrupt) return token;
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
  const expectedValue: string[] | undefined = expected[actual.type];
  return Boolean(expectedValue?.includes(actual.value));
};
