import { TokenType } from './token-type';

export type Token<
  T extends TokenType = TokenType,
  V extends string = string,
> = {
  abrupt?: never;
  type: T;
  start: number;
  end: number;
  value: V;
};

export const Token = <
  T extends TokenType = TokenType,
  V extends string = string,
>(
  type: T,
  start: number,
  end: number,
  value: V,
): Token<T, V> => ({ type, start, end, value });

export type IdentifierToken<V extends string = string> = Token<
  TokenType.Identifier,
  V
>;

export const IdentifierToken = <V extends string = string>(
  start: number,
  end: number,
  value: V,
): IdentifierToken<V> => Token(TokenType.Identifier, start, end, value);

export type KeywordToken<V extends string = string> = Token<
  TokenType.Keyword,
  V
>;

export const KeywordToken = <V extends string = string>(
  start: number,
  end: number,
  value: V,
): KeywordToken<V> => Token(TokenType.Keyword, start, end, value);

export type MatchedToken<T extends TokenMatcher> = {
  [K in keyof T]: Token<
    K extends TokenType ? K : never,
    T[K] extends string[] ? T[K][number] : never
  >;
}[keyof T];

export type NumberToken<V extends string = string> = Token<TokenType.Number, V>;

export const NumberToken = <V extends string = string>(
  start: number,
  end: number,
  value: V,
): NumberToken<V> => Token(TokenType.Number, start, end, value);

export type PunctuatorToken<V extends string = string> = Token<
  TokenType.Punctuator,
  V
>;

export const PunctuatorToken = <V extends string = string>(
  start: number,
  end: number,
  value: V,
): PunctuatorToken<V> => Token(TokenType.Punctuator, start, end, value);

export type StringToken<V extends string = string> = Token<TokenType.String, V>;

export const StringToken = <V extends string = string>(
  start: number,
  end: number,
  value: V,
): StringToken<V> => Token(TokenType.String, start, end, value);

export type TokenMatcher<T extends Token = Token> = TokenType extends T['type']
  ? { [K in TokenType]?: string[] }
  : {
      [K in T['type']]: (T extends Token<K, infer V> ? V : never)[];
    };
