import { BinaryExpression, Expression } from '../../grammar';
import { Parser, TokenType, consume, error } from '../../lexer';
import { parseUnaryExpression } from './unary-expression';

export const parseExponentiationExpression: Parser<Expression> = (data, i) => {
  const left = parseUnaryExpression(data, i);
  if (left.abrupt) return left;
  i = left.end;

  const operator = consume(data, i, TokenType.Punctuator, '**');
  if (operator.abrupt) return left;
  i = operator.end;

  const right = parseExponentiationExpression(data, operator.end);
  if (right.abrupt) return error(right);

  return BinaryExpression(left.start, right.end, '**', left, right);
};
