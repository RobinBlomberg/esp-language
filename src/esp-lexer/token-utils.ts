import { Keyword, Punctuator } from '../esp-grammar';
import { Abrupt, Error, Unused, error } from './abrupt';
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
  if (isAbrupt(token)) return token;
  return match(token, type, value) ? token : error(token);
};

export const consumeToken = <T extends TokenMatcher>(
  data: string,
  i: number,
  expected: T,
) => {
  const token = lex(data, i);
  if (isAbrupt(token)) return token;
  return matchToken(token, expected) ? token : error(token);
};

export const isAbrupt = (token: {} | { type: string }): token is Abrupt => {
  return isError(token) || isUnused(token);
};

export const isError = (token: {} | { type: string }): token is Error => {
  return (token as any)?.type === 'Error';
};

export const isUnused = (token: {} | { type: string }): token is Unused => {
  return (token as any)?.type === 'Unused';
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
  token: Token,
  matcher: T,
): token is T extends TokenMatcher<infer U> ? U : never => {
  const expectedValue = matcher[token.type];
  return Boolean(expectedValue?.includes(token.value));
};
