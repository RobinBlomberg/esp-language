import { BinaryExpression, Expression } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseUnaryExpression } from './unary-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ExponentiationExpression[Yield, Await] :
 *   UnaryExpression[?Yield, ?Await]
 *   UpdateExpression[?Yield, ?Await] ** ExponentiationExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ExponentiationExpression
 */
export const parseExponentiationExpression: Parser<Expression> = (data, i) => {
  const left = parseUnaryExpression(data, i);
  if (left) i = left.end;
  else return null;

  const operator = consume(data, i, TokenType.Punctuator, '**');
  if (operator) i = operator.end;
  else return left;

  const right = parseExponentiationExpression(data, operator.end);
  if (!right) return null;

  return BinaryExpression(left.start, right.end, '**', left, right);
};
