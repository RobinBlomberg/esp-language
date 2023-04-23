import { ConditionalExpression } from '../../es-ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';

/**
 * ```ecmarkup
 * ConditionalExpression[In, Yield, Await] :
 *   ShortCircuitExpression[?In, ?Yield, ?Await]
 *   ShortCircuitExpression[?In, ?Yield, ?Await] ? AssignmentExpression[+In, ?Yield, ?Await] :
 *     AssignmentExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ConditionalExpression
 */
export const writeConditionalExpression: Writer<ConditionalExpression> = (
  node,
  write,
) => {
  writeExpression(node, node.test, write);
  write('?');
  writeExpression(node, node.consequent, write);
  write(':');
  writeExpression(node, node.alternate, write);
};
