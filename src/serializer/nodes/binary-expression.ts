import { BinaryExpression } from '../../estree';
import { Writer } from '../write';

export const writeBinaryExpression: Writer<BinaryExpression> = (
  node,
  write,
) => {
  write(node.left);
  write(node.operator);
  write(node.right);
};
