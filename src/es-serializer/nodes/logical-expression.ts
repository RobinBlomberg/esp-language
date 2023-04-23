import { LogicalExpression } from '../../es-ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';

/**
 * ```ecmarkup
 * LogicalORExpression[In, Yield, Await] :
 *   LogicalANDExpression[?In, ?Yield, ?Await]
 *   LogicalORExpression[?In, ?Yield, ?Await] || LogicalANDExpression[?In, ?Yield, ?Await]
 *
 * LogicalANDExpression[In, Yield, Await] :
 *   BitwiseORExpression[?In, ?Yield, ?Await]
 *   LogicalANDExpression[?In, ?Yield, ?Await] && BitwiseORExpression[?In, ?Yield, ?Await]
 *
 * CoalesceExpression[In, Yield, Await] :
 *   CoalesceExpressionHead[?In, ?Yield, ?Await] ?? BitwiseORExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-LogicalORExpression
 * @see https://tc39.es/ecma262/#prod-LogicalANDExpression
 * @see https://tc39.es/ecma262/#prod-CoalesceExpression
 */
export const writeLogicalExpression: Writer<LogicalExpression> = (
  node,
  write,
) => {
  writeExpression(node, node.left, write);
  write(node.operator);
  writeExpression(node, node.right, write);
};
