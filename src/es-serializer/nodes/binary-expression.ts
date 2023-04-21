import { BinaryExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * BitwiseORExpression[In, Yield, Await] :
 *   BitwiseXORExpression[?In, ?Yield, ?Await]
 *   BitwiseORExpression[?In, ?Yield, ?Await] | BitwiseXORExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BitwiseORExpression
 */
export const writeBinaryExpression: Writer<BinaryExpression> = (
  node,
  write,
) => {
  write(node.left);
  write(node.operator);
  write(node.right);
};