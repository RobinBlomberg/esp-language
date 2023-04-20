import { AwaitExpression } from '../../estree';
import { Writer } from '../write';

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
