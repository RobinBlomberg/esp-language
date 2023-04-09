import { NodeType } from './node-type';
import {
  IdentifierNode,
  Literal,
  NodeMap,
  PrimaryExpression,
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
  elements: PrimaryExpression[],
) => {
  return createNode(start, end, NodeType.ArrayLiteral, { elements });
};

export const identifier = (start: number, end: number, name: string) => {
  return createNode(start, end, NodeType.Identifier, { name });
};

export const literal = (start: number, end: number, value: Literal) => {
  return createNode(start, end, NodeType.Literal, { value });
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
  key: IdentifierNode,
  value: PrimaryExpression,
) => {
  return createNode(start, end, NodeType.Property, { key, value });
};
