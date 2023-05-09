import { token } from '../token';

export namespace cst {
  export const enum Type {
    Invalid = 'Invalid',
    BooleanLiteral = 'BooleanLiteral',
    Identifier = 'Identifier',
    NumberLiteral = 'NumberLiteral',
    StringLiteral = 'StringLiteral',
    UnaryExpression = 'UnaryExpression',
    BinaryExpression = 'BinaryExpression',
    ReturnExpression = 'ReturnExpression',
    ThrowExpression = 'ThrowExpression',
  }

  export type Node<T extends Type = Type, V = unknown> = {
    t: T;
    s: number;
    e: number;
    v: V;
  };

  export type Invalid = Node<Type.Invalid, undefined>;

  export type BooleanLiteral = Node<Type.BooleanLiteral, { value: boolean }>;

  export type Identifier = Node<Type.Identifier, { name: string }>;

  export type NumberLiteral = Node<Type.NumberLiteral, { value: number }>;

  export type StringLiteral = Node<Type.StringLiteral, { value: string }>;

  export type UnaryExpression = Node<
    Type.UnaryExpression,
    { operator: token.UnaryOperator; argument: Expression }
  >;

  export type BinaryExpression = Node<
    Type.BinaryExpression,
    {
      left: Expression;
      operator: token.BinaryOperator;
      right: Expression;
    }
  >;

  export type Expression =
    | BinaryExpression
    | BooleanLiteral
    | Identifier
    | NumberLiteral
    | StringLiteral
    | UnaryExpression
    | ReturnExpression
    | ThrowExpression;

  export type ReturnExpression = Node<
    Type.ReturnExpression,
    { argument: Expression }
  >;

  export type ThrowExpression = Node<
    Type.ThrowExpression,
    { argument: Expression }
  >;

  export const Node = <T extends Type, V>(
    t: T,
    s: number,
    e: number,
    v: V,
  ): Node<T, V> => ({ t, s, e, v });

  export const Invalid = (s = 0): Invalid =>
    Node(Type.Invalid, s, s, undefined);

  export const Identifier = (s: number, e: number, name: string): Identifier =>
    Node(Type.Identifier, s, e, { name });

  export const NumberLiteral = (
    s: number,
    e: number,
    value: number,
  ): NumberLiteral => Node(Type.NumberLiteral, s, e, { value });

  export const StringLiteral = (
    s: number,
    e: number,
    value: string,
  ): StringLiteral => Node(Type.StringLiteral, s, e, { value });

  export const BooleanLiteral = (
    s: number,
    e: number,
    value: boolean,
  ): BooleanLiteral => Node(Type.BooleanLiteral, s, e, { value });

  export const UnaryExpression = (
    s: number,
    e: number,
    operator: token.UnaryOperator,
    argument: Expression,
  ): UnaryExpression =>
    Node(Type.UnaryExpression, s, e, { operator, argument });

  export const BinaryExpression = (
    s: number,
    e: number,
    left: Expression,
    operator: token.BinaryOperator,
    right: Expression,
  ): BinaryExpression =>
    Node(Type.BinaryExpression, s, e, {
      left,
      operator,
      right,
    });

  export const ReturnExpression = (
    s: number,
    e: number,
    argument: Expression,
  ): ReturnExpression => Node(Type.ReturnExpression, s, e, { argument });

  export const ThrowExpression = (
    s: number,
    e: number,
    argument: Expression,
  ): ThrowExpression => Node(Type.ThrowExpression, s, e, { argument });

  export const invalid = (node: Node | token.Token) => Invalid(node.s);
}
