import { lex } from './lex';
import { Token } from './token';
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
