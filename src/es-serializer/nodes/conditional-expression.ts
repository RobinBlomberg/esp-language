import { ConditionalExpression } from '../../es-ast';
import { Writer } from '../serialize';

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
  write(node.test);
  write('?');
  write(node.consequent);
  write(':');
  write(node.alternate);
};
