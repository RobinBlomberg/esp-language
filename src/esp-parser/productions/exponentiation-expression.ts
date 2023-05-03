import { BinaryExpression, Expression, NodeType } from '../../esp-grammar/ast';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { parseUnaryExpression } from './unary-expression';

export const parseExponentiationExpression: Parser<Expression> = (data, i) => {
  const left = parseUnaryExpression(data, i);
  if (left.abrupt) return left;
  i = left.end;

  const operator = consume(data, i, TokenType.Punctuator, '**');
  if (operator.abrupt) return left;
  // TODO: Allow unary expressions here (e.g. `+a ** 2`).
  if (left.type === NodeType.UnaryExpression) return error(left);
  i = operator.end;

  const right = parseExponentiationExpression(data, operator.end);
  if (right.abrupt) return error(right);

  return BinaryExpression(left.start, right.end, '**', left, right);
};
