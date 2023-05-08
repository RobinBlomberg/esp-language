export const enum Type {
  Invalid = 'Invalid',
  IdentifierName = 'Identifier',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  BooleanLiteral = 'BooleanLiteral',
  Identifier = 'Identifier',
  UnaryOperator = 'UnaryOperator',
  UnaryExpression = 'UnaryExpression',
  BinaryOperator = 'BinaryOperator',
  BinaryExpression = 'BinaryExpression',
}

export type Node<T extends Type = Type, V = unknown> = {
  t: T;
  s: number;
  e: number;
  v: V;
};

export const Node = <T extends Type, V>(
  t: T,
  s: number,
  e: number,
  v: V,
): Node<T, V> => ({ t, s, e, v });

export type Invalid = Node<Type.Invalid, undefined>;

export const Invalid = (s = 0): Invalid => Node(Type.Invalid, s, s, undefined);

export const invalid = (node: Node) => Invalid(node.s);

export type IdentifierName = Node<Type.IdentifierName, string>;

export const IdentifierName = (
  s: number,
  e: number,
  name: string,
): IdentifierName => Node(Type.IdentifierName, s, e, name);

export type NumberLiteral = Node<Type.NumberLiteral, { value: number }>;

export const NumberLiteral = (
  s: number,
  e: number,
  value: number,
): NumberLiteral => Node(Type.NumberLiteral, s, e, { value });

export type StringLiteral = Node<Type.StringLiteral, { value: string }>;

export const StringLiteral = (
  s: number,
  e: number,
  value: string,
): StringLiteral => Node(Type.StringLiteral, s, e, { value });

export type BooleanLiteral = Node<Type.BooleanLiteral, { value: boolean }>;

export const BooleanLiteral = (
  s: number,
  e: number,
  value: boolean,
): BooleanLiteral => Node(Type.BooleanLiteral, s, e, { value });

export type Identifier = Node<Type.Identifier, { name: string }>;

export const Identifier = (s: number, e: number, name: string): Identifier =>
  Node(Type.Identifier, s, e, { name });

export type UnaryOperator = Node<Type.UnaryOperator, { operator: '-' }>;

export const UnaryOperator = (
  s: number,
  e: number,
  operator: '-',
): UnaryOperator => Node(Type.UnaryOperator, s, e, { operator });

export type UnaryExpression = Node<
  Type.UnaryExpression,
  { operator: UnaryOperator; argument: Expression }
>;

export const UnaryExpression = (
  s: number,
  e: number,
  operator: UnaryOperator,
  argument: Expression,
): UnaryExpression => Node(Type.UnaryExpression, s, e, { operator, argument });

export type BinaryOperator = Node<Type.BinaryOperator, { operator: '+' | '-' }>;

export const BinaryOperator = (
  s: number,
  e: number,
  operator: '+' | '-',
): BinaryOperator => Node(Type.BinaryOperator, s, e, { operator });

export type BinaryExpression = Node<
  Type.BinaryExpression,
  {
    left: Expression;
    operator: BinaryOperator;
    right: Expression;
  }
>;

export const BinaryExpression = (
  s: number,
  e: number,
  left: Expression,
  operator: BinaryOperator,
  right: Expression,
): BinaryExpression =>
  Node(Type.BinaryExpression, s, e, {
    left,
    operator,
    right,
  });

export type Expression =
  | BinaryExpression
  | BooleanLiteral
  | Identifier
  | NumberLiteral
  | StringLiteral
  | UnaryExpression;
