import { consumeToken, error, Parser } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { UnaryOperatorTokenMatcher } from '../token-matchers';
import { parseUpdateExpression } from './update-expression';

export const parseUnaryExpression: Parser<IR.Expression> = (data, i) => {
  const operator = consumeToken(data, i, UnaryOperatorTokenMatcher);

  if (operator.abrupt) return parseUpdateExpression(data, i);
  i = operator.end;

  const argument = parseUnaryExpression(data, i);
  if (argument.abrupt) return error(argument);

  return IR.UnaryExpression(
    operator.start,
    argument.end,
    operator.value,
    argument,
  );
};
