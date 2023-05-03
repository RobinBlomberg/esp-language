import { Expression, UnaryExpression } from '../../grammar';
import { Parser, consumeToken, error } from '../../lexer';
import { UnaryOperatorTokenMatcher } from '../token-matchers';
import { parseUpdateExpression } from './update-expression';

export const parseUnaryExpression: Parser<Expression> = (data, i) => {
  const operator = consumeToken(data, i, UnaryOperatorTokenMatcher);

  if (operator.abrupt) return parseUpdateExpression(data, i);
  i = operator.end;

  const argument = parseUnaryExpression(data, i);
  if (argument.abrupt) return error(argument);

  return UnaryExpression(
    operator.start,
    argument.end,
    operator.value,
    argument,
  );
};
