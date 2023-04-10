import { Expression, UnaryExpression, UnaryOperatorTokenMatcher } from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseUpdateExpression } from './update-expression';

export const parseUnaryExpression: Parser<Expression> = (data, start) => {
  let i = start;

  const operator = consumeToken(data, i, UnaryOperatorTokenMatcher);

  if (operator) {
    i = operator.end;

    const argument = parseUnaryExpression(data, i);
    if (!argument) return null;

    return UnaryExpression(
      operator.start,
      argument.end,
      operator.value,
      argument,
    );
  }

  return parseUpdateExpression(data, i);
};
