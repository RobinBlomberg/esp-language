import {
  AdditiveOperatorTokenMatcher,
  BinaryExpression,
  Expression,
} from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseMultiplicativeExpression } from './multiplicative-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * AdditiveExpression[Yield, Await] :
 *   MultiplicativeExpression[?Yield, ?Await]
 *   AdditiveExpression[?Yield, ?Await] + MultiplicativeExpression[?Yield, ?Await]
 *   AdditiveExpression[?Yield, ?Await] - MultiplicativeExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-AdditiveExpression
 */
export const parseAdditiveExpression: Parser<Expression> = (data, i) => {
  let expression = parseMultiplicativeExpression(data, i);
  if (expression) i = expression.end;
  else return null;

  while (true) {
    const operator = consumeToken(data, i, AdditiveOperatorTokenMatcher);
    if (operator) i = operator.end;
    else return expression;

    const right = parseMultiplicativeExpression(data, operator.end);
    if (right) i = right.end;
    else return null;

    expression = BinaryExpression(
      expression.start,
      right.end,
      operator.value,
      expression,
      right,
    );
  }
};
