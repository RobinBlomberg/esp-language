import { TokenType } from './token-type';

export type IdentifierToken<V extends string = string> = Token<
  TokenType.Identifier,
  V
>;

export type KeywordToken<V extends string = string> = Token<
  TokenType.Keyword,
  V
>;

export type NumberToken<V extends string = string> = Token<TokenType.Number, V>;

export type PunctuatorToken<V extends string = string> = Token<
  TokenType.Punctuator,
  V
>;

export type StringToken<V extends string = string> = Token<TokenType.String, V>;

export type Token<
  T extends TokenType = TokenType,
  V extends string = string,
> = {
  type: T;
  start: number;
  end: number;
  value: V;
};

export type TokenMatcher<V extends string = string> = {
  [K in TokenType]?: V[];
};
