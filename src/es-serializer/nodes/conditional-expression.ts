import { ConditionalExpression } from '../../es-ast';
import { Writer } from '../serialize';

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
