import { NodeType } from './node-type';

export type ArrayLiteral = {
  type: NodeType.ArrayLiteral;
  start: number;
  end: number;
  elements: Expression[];
};

export type ComputedMemberExpression = {
  type: NodeType.ComputedMemberExpression;
  start: number;
  end: number;
  object: Expression;
  property: Expression;
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

export type Literal = {
  type: NodeType.Literal;
  start: number;
  end: number;
  value: LiteralValue;
};

export type LiteralValue = boolean | null | number | string | undefined;

export type NewExpression = {
  type: NodeType.NewExpression;
  start: number;
  end: number;
  callee: Expression;
  arguments: Expression[];
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

export type Property = {
  type: NodeType.Property;
  start: number;
  end: number;
  key: Identifier;
  value: Expression;
};

export type StaticMemberExpression = {
  type: NodeType.StaticMemberExpression;
  start: number;
  end: number;
  object: Expression;
  property: Identifier;
};
