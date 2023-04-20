import { ConditionalExpression } from '../../estree';
import { Writer } from '../write';

export const writeConditionalExpression: Writer<ConditionalExpression> = (
  node,
  write,
) => {
  write(node.test);
  write('?');
  write(node.consequent);
  write(':');
  write(node.alternate);
};
