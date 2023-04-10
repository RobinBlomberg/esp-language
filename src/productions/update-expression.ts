import {
  Expression,
  UpdateExpression,
  UpdateOperatorTokenMatcher,
} from '../ast';
import { isNodeSimple } from '../ast-utils';
import { Parser, consumeToken } from '../token-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';
import { parseUnaryExpression } from './unary-expression';

const EARLY_ERROR = 'Invalid left-hand side in assignment';

export const parseUpdateExpression: Parser<Expression> = (data, start) => {
  let i = start;

  const prefixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
  if (prefixOperator) {
    i = prefixOperator.end;

    const argument = parseUnaryExpression(data, i);
    if (!argument) return null;

    if (!isNodeSimple(argument)) {
      throw new SyntaxError(EARLY_ERROR);
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
  if (argument) {
    i = argument.end;

    if (!isNodeSimple(argument)) {
      throw new SyntaxError(EARLY_ERROR);
    }

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
