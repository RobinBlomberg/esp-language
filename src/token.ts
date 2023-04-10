import { TokenType } from './token-type';

export type Token<
  T extends TokenType = TokenType,
  V extends string = string,
> = {
  type: T;
  start: number;
  end: number;
  value: V;
};

export type TokenMatcher<
  T extends TokenType = TokenType,
  V extends string = string,
> = {
  type: T;
  value: V;
};

export const TokenMatcher = <T extends TokenType, V extends string = string>(
  type: T,
  value: V,
): TokenMatcher<T, V> => {
  return { type, value };
};
