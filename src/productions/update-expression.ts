import {
  Expression,
  UpdateExpression,
  UpdateOperatorTokenMatcher,
} from '../ast';
import { Parser, consumeToken } from '../parser-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';
import { parseUnaryExpression } from './unary-expression';

export const parseUpdateExpression: Parser<Expression> = (data, start) => {
  let i = start;

  const prefixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
  if (prefixOperator) {
    i = prefixOperator.end;

    const argument = parseUnaryExpression(data, i);
    if (!argument) return null;

    return UpdateExpression(
      prefixOperator.start,
      argument.end,
      prefixOperator.value,
      argument,
      true,
    );
  }

  const argument = parseLeftHandSideExpression(data, i);
  if (argument) {
    i = argument.end;

    const postfixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
    if (postfixOperator) {
      return UpdateExpression(
        argument.start,
        postfixOperator.end,
        postfixOperator.value,
        argument,
        false,
      );
    }

    return argument;
  }

  return null;
};
