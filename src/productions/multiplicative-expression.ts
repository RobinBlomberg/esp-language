import {
  BinaryExpression,
  Expression,
  MultiplicativeOperatorTokenMatcher,
} from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseExponentiationExpression } from './exponentiation-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * MultiplicativeExpression[Yield, Await] :
 *   ExponentiationExpression[?Yield, ?Await]
 *   MultiplicativeExpression[?Yield, ?Await] MultiplicativeOperator
 *     ExponentiationExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-MultiplicativeExpression
 */
export const parseMultiplicativeExpression: Parser<Expression> = (data, i) => {
  let expression = parseExponentiationExpression(data, i);
  if (expression) i = expression.end;
  else return null;

  while (true) {
    const operator = consumeToken(data, i, MultiplicativeOperatorTokenMatcher);
    if (operator) i = operator.end;
    else return expression;

    const right = parseExponentiationExpression(data, operator.end);
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
