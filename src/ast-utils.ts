import { Node } from './ast';
import { NodeType } from './node-type';

export const isNodeSimple = (node: Node): boolean => {
  return (
    node.type === NodeType.Identifier ||
    node.type === NodeType.StaticMemberExpression ||
    node.type === NodeType.ComputedMemberExpression
  );
};
