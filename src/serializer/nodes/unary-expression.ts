import { UnaryExpression } from '../../estree';
import { Writer } from '../write';

export const writeUnaryExpression: Writer<UnaryExpression> = (node, write) => {
  if (node.prefix) {
    write(node.operator);
  }

  write(node.argument);

  if (!node.prefix) {
    write(node.operator);
  }
};
