import { UnaryExpression } from '../../es-ast';
import { Writer } from '../serialize';

export const writeUnaryExpression: Writer<UnaryExpression> = (node, write) => {
  if (node.prefix) {
    write(node.operator);
  }

  write(node.argument);

  if (!node.prefix) {
    write(node.operator);
  }
};
