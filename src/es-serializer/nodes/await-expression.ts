import { AwaitExpression } from '../../es-ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';

/**
 * ```ecmarkup
 * AwaitExpression[Yield] :
 *   await UnaryExpression[?Yield, +Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-AwaitExpression
 */
export const writeAwaitExpression: Writer<AwaitExpression> = (node, write) => {
  write('await');
  writeExpression(node, node.argument, write);
};
