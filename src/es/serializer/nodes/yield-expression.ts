import { YieldExpression } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * YieldExpression[In, Await] :
 *   yield
 *   yield [no LineTerminator here] AssignmentExpression[?In, +Yield, ?Await]
 *   yield [no LineTerminator here] * AssignmentExpression[?In, +Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-YieldExpression
 */
export const writeYieldExpression: Writer<YieldExpression> = (node, write) => {
  write('yield');

  if (node.delegate) {
    write('*');
  }

  if (node.argument) {
    write(node.argument);
  }
};
