import { syntax } from '../syntax';

export namespace token {
  export const enum Type {
    Invalid = 'Invalid',
    Identifier = 'Identifier',
    Number = 'Number',
    Punctuator = 'Punctuator',
    String = 'String',
  }

  export type Token<
    T extends Type = Type,
    U extends string | undefined = string | undefined,
  > = {
    t: T;
    s: number;
    e: number;
    v: U;
  };

  export type Invalid = Token<Type.Invalid, undefined>;

  export type Identifier<T extends string = string> = Token<Type.Identifier, T>;

  export type Number = Token<Type.Number>;

  export type Punctuator<T extends syntax.Punctuator = syntax.Punctuator> =
    Token<Type.Punctuator, T>;

  export type String = Token<Type.String>;

  export type UnaryOperator = Punctuator<syntax.UnaryOperator>;

  export type BinaryOperator = Punctuator<syntax.BinaryOperator>;

  export type ReturnKeyword = Identifier<'return'>;

  export type ThrowKeyword = Identifier<'throw'>;

  export type Keyword = ReturnKeyword | ThrowKeyword;

  export const Token = <
    T extends Type = Type,
    U extends string | undefined = string | undefined,
  >(
    t: T,
    s: number,
    e: number,
    v: U = undefined as U,
  ): Token<T, U> => ({ t, s, e, v });

  export const Invalid = (s = 0): Invalid =>
    Token(Type.Invalid, s, s, undefined);

  export const Identifier = <T extends string = string>(
    s: number,
    e: number,
    v: T,
  ): Identifier<T> => Token(Type.Identifier, s, e, v);

  export const Number = (s: number, e: number, v: string): Number =>
    Token(Type.Number, s, e, v);

  export const Punctuator = <T extends syntax.Punctuator = syntax.Punctuator>(
    s: number,
    e: number,
    v: T,
  ): Punctuator<T> => Token(Type.Punctuator, s, e, v);

  export const String = (s: number, e: number, v: string): String =>
    Token(Type.String, s, e, v);

  export const UnaryOperator = (
    s: number,
    e: number,
    v: syntax.UnaryOperator,
  ): UnaryOperator => Punctuator(s, e, v);

  export const BinaryOperator = (
    s: number,
    e: number,
    v: syntax.BinaryOperator,
  ): BinaryOperator => Punctuator(s, e, v);

  export const ReturnKeyword = (s: number, e: number): ReturnKeyword =>
    Identifier(s, e, 'return');

  export const ThrowKeyword = (s: number, e: number): ThrowKeyword =>
    Identifier(s, e, 'throw');
}
