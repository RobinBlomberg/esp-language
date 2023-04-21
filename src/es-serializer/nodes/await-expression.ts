import { AwaitExpression } from '../../es-ast';
import { Writer } from '../serialize';

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
  write(node.argument);
};
