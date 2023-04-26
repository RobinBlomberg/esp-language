import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { BinaryExpression, Expression, NodeType } from '../ast';
import { parseUnaryExpression } from './unary-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ExponentiationExpression :
 *   UnaryExpression
 *   UpdateExpression ** ExponentiationExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ExponentiationExpression
 */
export const parseExponentiationExpression: Parser<Expression> = (data, i) => {
  const left = parseUnaryExpression(data, i);
  if (abrupt(left)) return left;
  i = left.end;

  const operator = consume(data, i, TokenType.Punctuator, '**');
  if (abrupt(operator)) return left;
  // TODO: Allow unary expressions here (e.g. `+a ** 2`).
  if (left.type === NodeType.UnaryExpression) return error(left);
  i = operator.end;

  const right = parseExponentiationExpression(data, operator.end);
  if (abrupt(right)) return error(right);

  return BinaryExpression(left.start, right.end, '**', left, right);
};
