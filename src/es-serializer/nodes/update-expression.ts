import { UpdateExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * UpdateExpression[Yield, Await] :
 *   LeftHandSideExpression[?Yield, ?Await]
 *   LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] ++
 *   LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] --
 *   ++ UnaryExpression[?Yield, ?Await]
 *   -- UnaryExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-UpdateExpression
 */
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
