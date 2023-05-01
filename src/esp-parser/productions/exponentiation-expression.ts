import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { BinaryExpression, Expression, NodeType } from '../ast';
import { parseUnaryExpression } from './unary-expression';

export const parseExponentiationExpression: Parser<Expression> = (data, i) => {
  const left = parseUnaryExpression(data, i);
  if (isAbrupt(left)) return left;
  i = left.end;

  const operator = consume(data, i, TokenType.Punctuator, '**');
  if (isAbrupt(operator)) return left;
  // TODO: Allow unary expressions here (e.g. `+a ** 2`).
  if (left.type === NodeType.UnaryExpression) return error(left);
  i = operator.end;

  const right = parseExponentiationExpression(data, operator.end);
  if (isAbrupt(right)) return error(right);

  return BinaryExpression(left.start, right.end, '**', left, right);
};
