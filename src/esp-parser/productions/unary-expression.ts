import { Parser, abrupt, consumeToken } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { Expression, UnaryExpression } from '../ast';
import { UnaryOperatorTokenMatcher } from '../token-matchers';
import { parseUpdateExpression } from './update-expression';

export const parseUnaryExpression: Parser<Expression> = (data, i) => {
  const operator = consumeToken(data, i, UnaryOperatorTokenMatcher);

  if (abrupt(operator)) return parseUpdateExpression(data, i);
  i = operator.end;

  const argument = parseUnaryExpression(data, i);
  if (abrupt(argument)) return error(argument);

  return UnaryExpression(
    operator.start,
    argument.end,
    operator.value,
    argument,
  );
};
