import { NodeType } from './node-type';
import { TokenMatcher } from './token';
import { TokenType } from './token-type';

const createNode = <T extends NodeType>(
  start: number,
  end: number,
  type: T,
  properties: Omit<NodeMap[T], 'start' | 'end' | 'type'>,
) => {
  return { start, end, type, ...properties } as NodeMap[T];
};

export type AdditiveOperator = '+' | '-';

export const AdditiveOperatorTokenMatcher: TokenMatcher<AdditiveOperator> = {
  [TokenType.Punctuator]: ['+', '-'],
};

export type Arguments = {
  type: NodeType.Arguments;
  start: number;
  end: number;
  arguments: Expression[];
};

export const Arguments = (
  start: number,
  end: number,
  arguments_: Expression[],
) => {
  return createNode(start, end, NodeType.Arguments, { arguments: arguments_ });
};

export type ArrayLiteral = {
  type: NodeType.ArrayLiteral;
  start: number;
  end: number;
  elements: Expression[];
};

export const ArrayLiteral = (
  start: number,
  end: number,
  elements: Expression[],
) => {
  return createNode(start, end, NodeType.ArrayLiteral, { elements });
};

export type BinaryExpression = {
  type: NodeType.BinaryExpression;
  start: number;
  end: number;
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
};

export const BinaryExpression = (
  start: number,
  end: number,
  operator: BinaryOperator,
  left: Expression,
  right: Expression,
) => {
  return createNode(start, end, NodeType.BinaryExpression, {
    operator,
    left,
    right,
  });
};

export type BinaryOperator =
  | '**'
  | '*'
  | '/'
  | '%'
  | '+'
  | '-'
  | '<<'
  | '>>'
  | '>>>'
  | '<'
  | '>'
  | '<='
  | '>='
  | 'instanceof'
  | 'in'
  | '=='
  | '!='
  | '&'
  | '^'
  | '|'
  | '&&'
  | '||'
  | '??';

export type CallExpression = {
  type: NodeType.CallExpression;
  start: number;
  end: number;
  callee: Expression;
  arguments: Arguments;
};

export const CallExpression = (
  start: number,
  end: number,
  callee: Expression,
  arguments_: Arguments,
) => {
  return createNode(start, end, NodeType.CallExpression, {
    callee,
    arguments: arguments_,
  });
};

export type ComputedMemberExpression = {
  type: NodeType.ComputedMemberExpression;
  start: number;
  end: number;
  object: Expression;
  property: Expression;
};

export const ComputedMemberExpression = (
  start: number,
  end: number,
  object: Expression,
  property: Expression,
) => {
  return createNode(start, end, NodeType.ComputedMemberExpression, {
    object,
    property,
  });
};

export type Expression =
  | ArrayLiteral
  | BinaryExpression
  | CallExpression
  | ComputedMemberExpression
  | Identifier
  | Literal
  | NewExpression
  | ObjectLiteral
  | StaticMemberExpression
  | UnaryExpression
  | UpdateExpression;

export type Identifier = {
  type: NodeType.Identifier;
  start: number;
  end: number;
  name: string;
};

export const Identifier = (start: number, end: number, name: string) => {
  return createNode(start, end, NodeType.Identifier, { name });
};

export type Literal = {
  type: NodeType.Literal;
  start: number;
  end: number;
  value: LiteralValue;
};

export const Literal = (start: number, end: number, value: LiteralValue) => {
  return createNode(start, end, NodeType.Literal, { value });
};

export type LiteralValue = boolean | null | number | string | undefined;

export type MultiplicativeOperator = '*' | '/' | '%';

export const MultiplicativeOperatorTokenMatcher: TokenMatcher<MultiplicativeOperator> =
  {
    [TokenType.Punctuator]: ['*', '/', '%'],
  };

export type NewExpression = {
  type: NodeType.NewExpression;
  start: number;
  end: number;
  callee: Expression;
  arguments: Arguments;
};

export const NewExpression = (
  start: number,
  end: number,
  callee: Expression,
  arguments_: Arguments,
) => {
  return createNode(start, end, NodeType.NewExpression, {
    callee,
    arguments: arguments_,
  });
};

export type Node = Expression;

export type NodeMap = {
  [NodeType.Arguments]: Arguments;
  [NodeType.ArrayLiteral]: ArrayLiteral;
  [NodeType.BinaryExpression]: BinaryExpression;
  [NodeType.CallExpression]: CallExpression;
  [NodeType.ComputedMemberExpression]: ComputedMemberExpression;
  [NodeType.Identifier]: Identifier;
  [NodeType.Literal]: Literal;
  [NodeType.NewExpression]: NewExpression;
  [NodeType.ObjectLiteral]: ObjectLiteral;
  [NodeType.Property]: Property;
  [NodeType.StaticMemberExpression]: StaticMemberExpression;
  [NodeType.UnaryExpression]: UnaryExpression;
  [NodeType.UpdateExpression]: UpdateExpression;
};

export type ObjectLiteral = {
  type: NodeType.ObjectLiteral;
  start: number;
  end: number;
  properties: Property[];
};

export const ObjectLiteral = (
  start: number,
  end: number,
  properties: Property[],
) => {
  return createNode(start, end, NodeType.ObjectLiteral, { properties });
};

export type Property = {
  type: NodeType.Property;
  start: number;
  end: number;
  key: Identifier;
  value: Expression;
};

export const Property = (
  start: number,
  end: number,
  key: Identifier,
  value: Expression,
) => {
  return createNode(start, end, NodeType.Property, { key, value });
};

export type ShiftOperator = '<<' | '>>' | '>>>';

export const ShiftOperatorTokenMatcher: TokenMatcher<ShiftOperator> = {
  [TokenType.Punctuator]: ['<<', '>>', '>>>'],
};

export type StaticMemberExpression = {
  type: NodeType.StaticMemberExpression;
  start: number;
  end: number;
  object: Expression;
  property: Identifier;
};

export const StaticMemberExpression = (
  start: number,
  end: number,
  object: Expression,
  property: Identifier,
) => {
  return createNode(start, end, NodeType.StaticMemberExpression, {
    object,
    property,
  });
};

export type UnaryExpression = {
  type: NodeType.UnaryExpression;
  start: number;
  end: number;
  operator: UnaryOperator;
  argument: Expression;
};

export const UnaryExpression = (
  start: number,
  end: number,
  operator: UnaryOperator,
  argument: Expression,
) => {
  return createNode(start, end, NodeType.UnaryExpression, {
    operator,
    argument,
  });
};

export type UnaryOperator =
  | 'delete'
  | 'void'
  | 'typeof'
  | '+'
  | '-'
  | '~'
  | '!';

export const UnaryOperatorTokenMatcher: TokenMatcher<UnaryOperator> = {
  [TokenType.Name]: ['delete', 'void', 'typeof'],
  [TokenType.Punctuator]: ['+', '-', '~', '!'],
};

export type UpdateExpression = {
  type: NodeType.UpdateExpression;
  start: number;
  end: number;
  operator: UpdateOperator;
  argument: Expression;
  prefix: boolean;
};

export const UpdateExpression = (
  start: number,
  end: number,
  operator: UpdateOperator,
  argument: Expression,
  prefix: boolean,
) => {
  return createNode(start, end, NodeType.UpdateExpression, {
    operator,
    argument,
    prefix,
  });
};

export type UpdateOperator = '++' | '--';

export const UpdateOperator: UpdateOperator[] = ['++', '--'];

export const UpdateOperatorTokenMatcher: TokenMatcher<UpdateOperator> = {
  [TokenType.Punctuator]: UpdateOperator,
};
