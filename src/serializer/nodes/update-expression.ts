import { UpdateExpression } from '../../estree';
import { Writer } from '../write';

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
