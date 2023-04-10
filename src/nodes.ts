import { NodeType } from './node-type';

export type ArrayLiteralNode = {
  type: NodeType.ArrayLiteral;
  start: number;
  end: number;
  elements: Expression[];
};

export type ComputedMemberExpressionNode = {
  type: NodeType.ComputedMemberExpression;
  start: number;
  end: number;
  object: Expression;
  property: Expression;
};

export type Expression =
  | ArrayLiteralNode
  | ComputedMemberExpressionNode
  | IdentifierNode
  | LiteralNode
  | NewExpressionNode
  | ObjectLiteralNode
  | StaticMemberExpressionNode;

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

export type NewExpressionNode = {
  type: NodeType.NewExpression;
  start: number;
  end: number;
  callee: Expression;
  arguments: Expression[];
};

export type Node = Expression;

export type NodeMap = {
  [NodeType.ArrayLiteral]: ArrayLiteralNode;
  [NodeType.ComputedMemberExpression]: ComputedMemberExpressionNode;
  [NodeType.Identifier]: IdentifierNode;
  [NodeType.Literal]: LiteralNode;
  [NodeType.NewExpression]: NewExpressionNode;
  [NodeType.ObjectLiteral]: ObjectLiteralNode;
  [NodeType.Property]: Property;
  [NodeType.StaticMemberExpression]: StaticMemberExpressionNode;
};

export type ObjectLiteralNode = {
  type: NodeType.ObjectLiteral;
  start: number;
  end: number;
  properties: Property[];
};

export type Property = {
  type: NodeType.Property;
  start: number;
  end: number;
  key: IdentifierNode;
  value: Expression;
};

export type StaticMemberExpressionNode = {
  type: NodeType.StaticMemberExpression;
  start: number;
  end: number;
  object: Expression;
  property: IdentifierNode;
};
