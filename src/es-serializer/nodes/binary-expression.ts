import { BinaryExpression } from '../../es-ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';

/**
 * ```ecmarkup
 * BitwiseORExpression[In, Yield, Await] :
 *   BitwiseXORExpression[?In, ?Yield, ?Await]
 *   BitwiseORExpression[?In, ?Yield, ?Await] | BitwiseXORExpression[?In, ?Yield, ?Await]
 *
 * BitwiseXORExpression[In, Yield, Await] :
 *   BitwiseANDExpression[?In, ?Yield, ?Await]
 *   BitwiseXORExpression[?In, ?Yield, ?Await] ^ BitwiseANDExpression[?In, ?Yield, ?Await]
 *
 * BitwiseANDExpression[In, Yield, Await] :
 *   EqualityExpression[?In, ?Yield, ?Await]
 *   BitwiseANDExpression[?In, ?Yield, ?Await] & EqualityExpression[?In, ?Yield, ?Await]
 *
 * EqualityExpression[In, Yield, Await] :
 *   RelationalExpression[?In, ?Yield, ?Await]
 *   EqualityExpression[?In, ?Yield, ?Await] == RelationalExpression[?In, ?Yield, ?Await]
 *   EqualityExpression[?In, ?Yield, ?Await] != RelationalExpression[?In, ?Yield, ?Await]
 *   EqualityExpression[?In, ?Yield, ?Await] === RelationalExpression[?In, ?Yield, ?Await]
 *   EqualityExpression[?In, ?Yield, ?Await] !== RelationalExpression[?In, ?Yield, ?Await]
 *
 * RelationalExpression[In, Yield, Await] :
 *   ShiftExpression[?Yield, ?Await]
 *   RelationalExpression[?In, ?Yield, ?Await] < ShiftExpression[?Yield, ?Await]
 *   RelationalExpression[?In, ?Yield, ?Await] > ShiftExpression[?Yield, ?Await]
 *   RelationalExpression[?In, ?Yield, ?Await] <= ShiftExpression[?Yield, ?Await]
 *   RelationalExpression[?In, ?Yield, ?Await] >= ShiftExpression[?Yield, ?Await]
 *   RelationalExpression[?In, ?Yield, ?Await] instanceof ShiftExpression[?Yield, ?Await]
 *   [+In] RelationalExpression[+In, ?Yield, ?Await] in ShiftExpression[?Yield, ?Await]
 *   [+In] PrivateIdentifier in ShiftExpression[?Yield, ?Await]
 *
 * ShiftExpression[Yield, Await] :
 *   AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] << AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] >> AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] >>> AdditiveExpression[?Yield, ?Await]
 *
 * AdditiveExpression[Yield, Await] :
 *   MultiplicativeExpression[?Yield, ?Await]
 *   AdditiveExpression[?Yield, ?Await] + MultiplicativeExpression[?Yield, ?Await]
 *   AdditiveExpression[?Yield, ?Await] - MultiplicativeExpression[?Yield, ?Await]
 *
 * MultiplicativeExpression[Yield, Await] :
 *   ExponentiationExpression[?Yield, ?Await]
 *   MultiplicativeExpression[?Yield, ?Await] MultiplicativeOperator
 *     ExponentiationExpression[?Yield, ?Await]
 *
 * MultiplicativeOperator : one of
 *   * / %
 *
 * ExponentiationExpression[Yield, Await] :
 *   UnaryExpression[?Yield, ?Await]
 *   UpdateExpression[?Yield, ?Await] ** ExponentiationExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BitwiseORExpression
 * @see https://tc39.es/ecma262/#prod-BitwiseXORExpression
 * @see https://tc39.es/ecma262/#prod-BitwiseANDExpression
 * @see https://tc39.es/ecma262/#prod-EqualityExpression
 * @see https://tc39.es/ecma262/#prod-RelationalExpression
 * @see https://tc39.es/ecma262/#prod-ShiftExpression
 * @see https://tc39.es/ecma262/#prod-AdditiveExpression
 * @see https://tc39.es/ecma262/#prod-MultiplicativeExpression
 * @see https://tc39.es/ecma262/#prod-ExponentiationExpression
 */
export const writeBinaryExpression: Writer<BinaryExpression> = (
  node,
  write,
) => {
  writeExpression(node, node.left, write);
  write(node.operator);
  writeExpression(node, node.right, write);
};
