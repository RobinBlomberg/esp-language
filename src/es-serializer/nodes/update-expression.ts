import { UpdateExpression } from '../../es-ast';
import { Writer } from '../serialize';

export const writeUpdateExpression: Writer<UpdateExpression> = (
  node,
  write,
) => {
  if (node.prefix) {
    write(node.operator);
  }

  write(node.argument);

  if (!node.prefix) {
    write(node.operator);
  }
};
