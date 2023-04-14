import { Parser, TokenType, consume } from '../../lexer';
import { BinaryExpression, Expression } from '../ast';
import { NodeType } from '../node-type';
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
  if (left) i = left.end;
  else return null;

  const operator = consume(data, i, TokenType.Punctuator, '**');
  if (operator) {
    // TODO: Allow unary expressions here (e.g. `+a ** 2`).
    if (left.type === NodeType.UnaryExpression) return null;
    i = operator.end;
  } else return left;

  const right = parseExponentiationExpression(data, operator.end);
  if (!right) return null;

  return BinaryExpression(left.start, right.end, '**', left, right);
};
