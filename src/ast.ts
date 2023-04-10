import { NodeType } from './node-type';
import * as ast from './ast';

const createNode = <T extends NodeType>(
  start: number,
  end: number,
  type: T,
  properties: Omit<ast.NodeMap[T], 'start' | 'end' | 'type'>,
) => {
  return { start, end, type, ...properties } as ast.NodeMap[T];
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
  elements: ast.Expression[],
) => {
  return createNode(start, end, NodeType.ArrayLiteral, { elements });
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
  object: ast.Expression,
  property: ast.Expression,
) => {
  return createNode(start, end, NodeType.ComputedMemberExpression, {
    object,
    property,
  });
};

export type Expression =
  | ArrayLiteral
  | ComputedMemberExpression
  | Identifier
  | Literal
  | NewExpression
  | ObjectLiteral
  | StaticMemberExpression;

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

export const Literal = (
  start: number,
  end: number,
  value: ast.LiteralValue,
) => {
  return createNode(start, end, NodeType.Literal, { value });
};

export type LiteralValue = boolean | null | number | string | undefined;

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
  callee: ast.Expression,
  arguments_: ast.Expression[],
) => {
  return createNode(start, end, NodeType.NewExpression, {
    callee,
    arguments: arguments_,
  });
};

export type Node = Expression;

export type NodeMap = {
  [NodeType.ArrayLiteral]: ArrayLiteral;
  [NodeType.ComputedMemberExpression]: ComputedMemberExpression;
  [NodeType.Identifier]: Identifier;
  [NodeType.Literal]: Literal;
  [NodeType.NewExpression]: NewExpression;
  [NodeType.ObjectLiteral]: ObjectLiteral;
  [NodeType.Property]: Property;
  [NodeType.StaticMemberExpression]: StaticMemberExpression;
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
  properties: ast.Property[],
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
  key: ast.Identifier,
  value: ast.Expression,
) => {
  return createNode(start, end, NodeType.Property, { key, value });
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
  object: ast.Expression,
  property: ast.Identifier,
) => {
  return createNode(start, end, NodeType.StaticMemberExpression, {
    object,
    property,
  });
};
