import { LogicalExpression } from '../../es-ast';
import { Writer } from '../serialize';

export const writeLogicalExpression: Writer<LogicalExpression> = (
  node,
  write,
) => {
  write(node.left);
  write(node.operator);
  write(node.right);
};
