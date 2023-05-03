import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir';
import { parseUnaryExpression } from './unary-expression';

export const parseExponentiationExpression: Parser<IR.Expression> = (
  data,
  i,
) => {
  const left = parseUnaryExpression(data, i);
  if (left.abrupt) return left;
  i = left.end;

  const operator = consume(data, i, TokenType.Punctuator, '**');
  if (operator.abrupt) return left;
  // TODO: Allow unary expressions here (e.g. `+a ** 2`).
  if (left.type === IR.NodeType.UnaryExpression) return error(left);
  i = operator.end;

  const right = parseExponentiationExpression(data, operator.end);
  if (right.abrupt) return error(right);

  return IR.BinaryExpression(left.start, right.end, '**', left, right);
};
