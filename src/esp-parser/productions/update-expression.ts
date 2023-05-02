import { consumeToken, error, Parser } from '../../esp-lexer';
import { Expression, UpdateExpression } from '../ast';
import { errors } from '../errors';
import { isSimpleNode } from '../parser-utils';
import { UpdateOperatorTokenMatcher } from '../token-matchers';
import { parseLeftHandSideExpression } from './left-hand-side-expression';
import { parseUnaryExpression } from './unary-expression';

export const parseUpdateExpression: Parser<Expression> = (data, i) => {
  const prefixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
  if (!prefixOperator.abrupt) {
    i = prefixOperator.end;

    const argument = parseUnaryExpression(data, i);
    if (argument.abrupt) return error(argument);
    if (!isSimpleNode(argument)) {
      throw new ReferenceError(errors.invalidLeftHandSideInAssigment());
    }

    return UpdateExpression(
      prefixOperator.start,
      argument.end,
      prefixOperator.value,
      argument,
      true,
    );
  }

  const argument = parseLeftHandSideExpression(data, i);
  if (argument.abrupt) return argument;
  i = argument.end;

  const postfixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
  if (postfixOperator.abrupt) return argument;
  if (!isSimpleNode(argument)) {
    throw new ReferenceError(errors.invalidLeftHandSideInAssigment());
  }

  return UpdateExpression(
    argument.start,
    postfixOperator.end,
    postfixOperator.value,
    argument,
    false,
  );
};
