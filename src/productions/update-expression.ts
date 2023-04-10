import { Expression, UpdateExpression, UpdateOperator } from '../ast';
import { Parser, consume } from '../parser-utils';
import { TokenType as tt } from '../token-type';
import { parseLeftHandSideExpression } from './left-hand-side-expression';
import { parseUnaryExpression } from './unary-expression';

export const parseUpdateExpression: Parser<Expression> = (data, start) => {
  let i = start;

  const prefixOperator = consume(data, i, tt.Punctuator, UpdateOperator);
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

    const postfixOperator = consume(data, i, tt.Punctuator, UpdateOperator);
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
