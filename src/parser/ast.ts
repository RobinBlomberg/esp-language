import { MemberExpression } from '../estree/ast';

export const enum NodeType {
  ArrayLiteral = 'ArrayLiteral',
  AssignmentExpression = 'AssignmentExpression',
  BinaryExpression = 'BinaryExpression',
  BlockStatement = 'BlockStatement',
  BreakStatement = 'BreakStatement',
  CallExpression = 'CallExpression',
  ComputedMemberExpression = 'ComputedMemberExpression',
  ConditionalExpression = 'ConditionalExpression',
  ContinueStatement = 'ContinueStatement',
  DoWhileStatement = 'DoWhileStatement',
  ExpressionStatement = 'ExpressionStatement',
  Identifier = 'Identifier',
  IfStatement = 'IfStatement',
  Literal = 'Literal',
  MatchCase = 'MatchCase',
  MatchStatement = 'MatchStatement',
  NewExpression = 'NewExpression',
  ObjectLiteral = 'ObjectLiteral',
  Property = 'Property',
  ReturnStatement = 'ReturnStatement',
  SetLiteral = 'SetLiteral',
  StaticMemberExpression = 'StaticMemberExpression',
  ThrowStatement = 'ThrowStatement',
  UnaryExpression = 'UnaryExpression',
  UnionClause = 'UnionClause',
  UpdateExpression = 'UpdateExpression',
  VariableDeclaration = 'VariableDeclaration',
  WhileStatement = 'WhileStatement',
}

export type LeftHandSideExpression =
  | CallExpression
  | MemberExpression
  | NewExpression
  | PrimaryExpression;

export type Node = Expression | Statement | UnionClause;

export const Node = <T extends NodeType>(
  start: number,
  end: number,
  type: T,
  properties: Omit<NodeMap[T], 'start' | 'end' | 'type'>,
) => {
  return { start, end, type, ...properties } as NodeMap[T];
};

export type NodeMap = {
  [NodeType.ArrayLiteral]: ArrayLiteral;
  [NodeType.AssignmentExpression]: AssignmentExpression;
  [NodeType.BinaryExpression]: BinaryExpression;
  [NodeType.BlockStatement]: BlockStatement;
  [NodeType.BreakStatement]: BreakStatement;
  [NodeType.CallExpression]: CallExpression;
  [NodeType.ComputedMemberExpression]: ComputedMemberExpression;
  [NodeType.ConditionalExpression]: ConditionalExpression;
  [NodeType.ContinueStatement]: ContinueStatement;
  [NodeType.DoWhileStatement]: DoWhileStatement;
  [NodeType.ExpressionStatement]: ExpressionStatement;
  [NodeType.Identifier]: Identifier;
  [NodeType.IfStatement]: IfStatement;
  [NodeType.Literal]: Literal;
  [NodeType.MatchCase]: MatchCase;
  [NodeType.MatchStatement]: MatchStatement;
  [NodeType.NewExpression]: NewExpression;
  [NodeType.ObjectLiteral]: ObjectLiteral;
  [NodeType.Property]: Property;
  [NodeType.ReturnStatement]: ReturnStatement;
  [NodeType.SetLiteral]: SetLiteral;
  [NodeType.StaticMemberExpression]: StaticMemberExpression;
  [NodeType.ThrowStatement]: ThrowStatement;
  [NodeType.UnaryExpression]: UnaryExpression;
  [NodeType.UnionClause]: UnionClause;
  [NodeType.UpdateExpression]: UpdateExpression;
  [NodeType.VariableDeclaration]: VariableDeclaration;
  [NodeType.WhileStatement]: WhileStatement;
};

export type PrimaryExpression =
  | Identifier
  | Literal
  | ArrayLiteral
  | ObjectLiteral;

export type SimpleNode =
  | Identifier
  | StaticMemberExpression
  | ComputedMemberExpression;

export type AdditiveOperator = '+' | '-';

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
  return Node(start, end, NodeType.ArrayLiteral, { elements });
};

export type AssignmentExpression = {
  type: NodeType.AssignmentExpression;
  start: number;
  end: number;
  operator: AssignmentOperator;
  left: SimpleNode;
  right: Expression;
};

export const AssignmentExpression = (
  start: number,
  end: number,
  operator: AssignmentOperator,
  left: SimpleNode,
  right: Expression,
) => {
  return Node(start, end, NodeType.AssignmentExpression, {
    operator,
    left,
    right,
  });
};

export type AssignmentOperator =
  | '='
  | '*='
  | '/='
  | '%='
  | '+='
  | '-='
  | '<<='
  | '>>='
  | '>>>='
  | '&='
  | '^='
  | '|='
  | '**='
  | '&&='
  | '||=';

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
  return Node(start, end, NodeType.BinaryExpression, {
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
  | '=='
  | '!='
  | '&'
  | '^'
  | '|'
  | '&&'
  | '||'
  | '??';

export type BlockStatement = {
  type: NodeType.BlockStatement;
  start: number;
  end: number;
  body: Statement[];
};

export const BlockStatement = (
  start: number,
  end: number,
  body: Statement[],
) => {
  return Node(start, end, NodeType.BlockStatement, { body });
};

export type BreakStatement = {
  type: NodeType.BreakStatement;
  start: number;
  end: number;
};

export const BreakStatement = (start: number, end: number) => {
  return Node(start, end, NodeType.BreakStatement, {});
};

export type CallExpression = {
  type: NodeType.CallExpression;
  start: number;
  end: number;
  callee: Expression;
  arguments: Expression[];
};

export const CallExpression = (
  start: number,
  end: number,
  callee: Expression,
  arguments_: Expression[],
) => {
  return Node(start, end, NodeType.CallExpression, {
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
  return Node(start, end, NodeType.ComputedMemberExpression, {
    object,
    property,
  });
};

export type ConditionalExpression = {
  type: NodeType.ConditionalExpression;
  start: number;
  end: number;
  test: Expression;
  alternate: Expression;
  consequent: Expression;
};

export const ConditionalExpression = (
  start: number,
  end: number,
  test: Expression,
  alternate: Expression,
  consequent: Expression,
) => {
  return Node(start, end, NodeType.ConditionalExpression, {
    test,
    alternate,
    consequent,
  });
};

export type ContinueStatement = {
  type: NodeType.ContinueStatement;
  start: number;
  end: number;
};

export const ContinueStatement = (start: number, end: number) => {
  return Node(start, end, NodeType.ContinueStatement, {});
};

export type DoWhileStatement = {
  type: NodeType.DoWhileStatement;
  start: number;
  end: number;
  body: Statement;
  test: Expression;
};

export const DoWhileStatement = (
  start: number,
  end: number,
  body: Statement,
  test: Expression,
) => {
  return Node(start, end, NodeType.DoWhileStatement, { test, body });
};

export type EqualityOperator = '==' | '!=';

export type Expression =
  | ArrayLiteral
  | AssignmentExpression
  | BinaryExpression
  | CallExpression
  | ComputedMemberExpression
  | ConditionalExpression
  | Identifier
  | Literal
  | NewExpression
  | ObjectLiteral
  | SetLiteral
  | StaticMemberExpression
  | UnaryExpression
  | UpdateExpression;

export type ExpressionStatement = {
  type: NodeType.ExpressionStatement;
  start: number;
  end: number;
  expression: Expression;
};

export const ExpressionStatement = (
  start: number,
  end: number,
  expression: Expression,
) => {
  return Node(start, end, NodeType.ExpressionStatement, { expression });
};

export type Identifier = {
  type: NodeType.Identifier;
  start: number;
  end: number;
  name: string;
};

export const Identifier = (start: number, end: number, name: string) => {
  return Node(start, end, NodeType.Identifier, { name });
};

export type IfStatement = {
  type: NodeType.IfStatement;
  start: number;
  end: number;
  test: Expression;
  consequent: Statement;
  alternate: Statement | null;
};

export const IfStatement = (
  start: number,
  end: number,
  test: Expression,
  consequent: Statement,
  alternate: Statement | null,
) => {
  return Node(start, end, NodeType.IfStatement, {
    test,
    consequent,
    alternate,
  });
};

export type Literal = {
  type: NodeType.Literal;
  start: number;
  end: number;
  value: LiteralValue;
};

export const Literal = (start: number, end: number, value: LiteralValue) => {
  return Node(start, end, NodeType.Literal, { value });
};

export type LiteralValue = boolean | null | number | string | undefined;

export type MatchCase = {
  type: NodeType.MatchCase;
  start: number;
  end: number;
  test: Expression | UnionClause;
  consequent: Statement;
};

export const MatchCase = (
  start: number,
  end: number,
  test: Expression | UnionClause,
  consequent: Statement,
) => {
  return Node(start, end, NodeType.MatchCase, { test, consequent });
};

export type MatchStatement = {
  type: NodeType.MatchStatement;
  start: number;
  end: number;
  discriminant: Expression;
  cases: MatchCase[];
  alternate: Statement | null;
};

export const MatchStatement = (
  start: number,
  end: number,
  discriminant: Expression,
  cases: MatchCase[],
  alternate: Statement | null,
) => {
  return Node(start, end, NodeType.MatchStatement, {
    discriminant,
    cases,
    alternate,
  });
};

export type MultiplicativeOperator = '*' | '/' | '%';

export type NewExpression = {
  type: NodeType.NewExpression;
  start: number;
  end: number;
  callee: Expression;
  arguments: Expression[];
};

export const NewExpression = (
  start: number,
  end: number,
  callee: Expression,
  arguments_: Expression[],
) => {
  return Node(start, end, NodeType.NewExpression, {
    callee,
    arguments: arguments_,
  });
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
  return Node(start, end, NodeType.ObjectLiteral, { properties });
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
  return Node(start, end, NodeType.Property, { key, value });
};

export type RelationalOperator = '<' | '>' | '<=' | '>=';

export type ReturnStatement = {
  type: NodeType.ReturnStatement;
  start: number;
  end: number;
  argument: Expression;
};

export const ReturnStatement = (
  start: number,
  end: number,
  argument: Expression,
) => {
  return Node(start, end, NodeType.ReturnStatement, { argument });
};

export type SetLiteral = {
  type: NodeType.SetLiteral;
  start: number;
  end: number;
  values: Expression[];
};

export const SetLiteral = (
  start: number,
  end: number,
  values: Expression[],
) => {
  return Node(start, end, NodeType.SetLiteral, { values });
};

export type ShiftOperator = '<<' | '>>' | '>>>';

export type Statement =
  | BlockStatement
  | BreakStatement
  | ContinueStatement
  | DoWhileStatement
  | ExpressionStatement
  | IfStatement
  | MatchStatement
  | ReturnStatement
  | ThrowStatement
  | VariableDeclaration
  | WhileStatement;

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
  return Node(start, end, NodeType.StaticMemberExpression, {
    object,
    property,
  });
};

export type ThrowStatement = {
  type: NodeType.ThrowStatement;
  start: number;
  end: number;
  argument: Expression;
};

export const ThrowStatement = (
  start: number,
  end: number,
  argument: Expression,
) => {
  return Node(start, end, NodeType.ThrowStatement, { argument });
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
  return Node(start, end, NodeType.UnaryExpression, {
    operator,
    argument,
  });
};

export type UnaryOperator = '-' | '!';

export type UnionClause = {
  type: NodeType.UnionClause;
  start: number;
  end: number;
  values: Expression[];
};

export const UnionClause = (
  start: number,
  end: number,
  values: Expression[],
) => {
  return Node(start, end, NodeType.UnionClause, { values });
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
  return Node(start, end, NodeType.UpdateExpression, {
    operator,
    argument,
    prefix,
  });
};

export type UpdateOperator = '++' | '--';

export const UpdateOperator: UpdateOperator[] = ['++', '--'];

export type VariableDeclaration = {
  type: NodeType.VariableDeclaration;
  start: number;
  end: number;
  id: string;
  init: Expression;
};

export const VariableDeclaration = (
  start: number,
  end: number,
  id: string,
  init: Expression,
) => {
  return Node(start, end, NodeType.VariableDeclaration, { id, init });
};

export type WhileStatement = {
  type: NodeType.WhileStatement;
  start: number;
  end: number;
  test: Expression;
  body: Statement;
};

export const WhileStatement = (
  start: number,
  end: number,
  test: Expression,
  body: Statement,
) => {
  return Node(start, end, NodeType.WhileStatement, { test, body });
};