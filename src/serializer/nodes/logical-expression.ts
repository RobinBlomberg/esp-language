import { LogicalExpression } from '../../estree';
import { Writer } from '../write';

export const writeLogicalExpression: Writer<LogicalExpression> = (
  node,
  write,
) => {
  write(node.left);
  write(node.operator);
  write(node.right);
};
