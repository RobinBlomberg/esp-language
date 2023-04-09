import { NodeType } from './node-type';

export type ArrayLiteralNode = {
  type: NodeType.ArrayLiteral;
  start: number;
  end: number;
  elements: PrimaryExpression[];
};

export type IdentifierNode = {
  type: NodeType.Identifier;
  start: number;
  end: number;
  name: string;
};

export type Literal = boolean | null | number | string | undefined;

export type LiteralNode = {
  type: NodeType.Literal;
  start: number;
  end: number;
  value: Literal;
};

export type Node = PrimaryExpression;

export type NodeMap = {
  [NodeType.ArrayLiteral]: ArrayLiteralNode;
  [NodeType.Identifier]: IdentifierNode;
  [NodeType.Literal]: LiteralNode;
  [NodeType.ObjectLiteral]: ObjectLiteralNode;
  [NodeType.Property]: Property;
};

export type ObjectLiteralNode = {
  type: NodeType.ObjectLiteral;
  start: number;
  end: number;
  properties: Property[];
};

export type PrimaryExpression =
  | ArrayLiteralNode
  | IdentifierNode
  | LiteralNode
  | ObjectLiteralNode;

export type Property = {
  type: NodeType.Property;
  start: number;
  end: number;
  key: IdentifierNode;
  value: PrimaryExpression;
};
