import { NodeType } from './node-type';
import {
  Expression,
  Identifier,
  LiteralValue,
  NodeMap,
  Property,
} from './nodes';

const createNode = <T extends NodeType>(
  start: number,
  end: number,
  type: T,
  properties: Omit<NodeMap[T], 'start' | 'end' | 'type'>,
) => {
  return { start, end, type, ...properties } as NodeMap[T];
};

export const arrayLiteral = (
  start: number,
  end: number,
  elements: Expression[],
) => {
  return createNode(start, end, NodeType.ArrayLiteral, { elements });
};

export const computedMemberExpression = (
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

export const identifier = (start: number, end: number, name: string) => {
  return createNode(start, end, NodeType.Identifier, { name });
};

export const literal = (start: number, end: number, value: LiteralValue) => {
  return createNode(start, end, NodeType.Literal, { value });
};

export const newExpression = (
  start: number,
  end: number,
  callee: Expression,
  arguments_: Expression[],
) => {
  return createNode(start, end, NodeType.NewExpression, {
    callee,
    arguments: arguments_,
  });
};

export const objectLiteral = (
  start: number,
  end: number,
  properties: Property[],
) => {
  return createNode(start, end, NodeType.ObjectLiteral, { properties });
};

export const property = (
  start: number,
  end: number,
  key: Identifier,
  value: Expression,
) => {
  return createNode(start, end, NodeType.Property, { key, value });
};

export const staticMemberExpression = (
  start: number,
  end: number,
  object: Expression,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  property: Identifier,
) => {
  return createNode(start, end, NodeType.StaticMemberExpression, {
    object,
    property,
  });
};
