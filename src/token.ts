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
