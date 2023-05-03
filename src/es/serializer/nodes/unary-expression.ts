import { UnaryExpression } from '../../ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';

/**
 * ```ecmarkup
 * UnaryExpression[Yield, Await] :
 *   ...
 *   delete UnaryExpression[?Yield, ?Await]
 *   void UnaryExpression[?Yield, ?Await]
 *   typeof UnaryExpression[?Yield, ?Await]
 *   + UnaryExpression[?Yield, ?Await]
 *   - UnaryExpression[?Yield, ?Await]
 *   ~ UnaryExpression[?Yield, ?Await]
 *   ! UnaryExpression[?Yield, ?Await]
 *   ...
 *
 * AwaitExpression[Yield] :
 *   await UnaryExpression[?Yield, +Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-UnaryExpression
 */
export const writeUnaryExpression: Writer<UnaryExpression> = (node, write) => {
  if (node.prefix) {
    write(node.operator);
  }

  writeExpression(node, node.argument, write);

  if (!node.prefix) {
    write(node.operator);
  }
};
