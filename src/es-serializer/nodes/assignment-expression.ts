import { AssignmentExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * AssignmentExpression[In, Yield, Await] :
 *   ConditionalExpression[?In, ?Yield, ?Await]
 *   [+Yield] YieldExpression[?In, ?Await]
 *   ArrowFunction[?In, ?Yield, ?Await]
 *   AsyncArrowFunction[?In, ?Yield, ?Await]
 *   LeftHandSideExpression[?Yield, ?Await] = AssignmentExpression[?In, ?Yield, ?Await]
 *   LeftHandSideExpression[?Yield, ?Await] AssignmentOperator
 *     AssignmentExpression[?In, ?Yield, ?Await]
 *   LeftHandSideExpression[?Yield, ?Await] &&= AssignmentExpression[?In, ?Yield, ?Await]
 *   LeftHandSideExpression[?Yield, ?Await] ||= AssignmentExpression[?In, ?Yield, ?Await]
 *   LeftHandSideExpression[?Yield, ?Await] ??= AssignmentExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-AssignmentExpression
 */
export const writeAssignmentExpression: Writer<AssignmentExpression> = (
  node,
  write,
) => {
  write(node.left);
  write(node.operator);
  write(node.right);
};
