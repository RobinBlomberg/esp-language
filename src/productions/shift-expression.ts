import {
  BinaryExpression,
  Expression,
  ShiftOperatorTokenMatcher,
} from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseAdditiveExpression } from './additive-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ShiftExpression[Yield, Await] :
 *   AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] << AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] >> AdditiveExpression[?Yield, ?Await]
 *   ShiftExpression[?Yield, ?Await] >>> AdditiveExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ShiftExpression
 */
export const parseShiftExpression: Parser<Expression> = (data, i) => {
  let expression = parseAdditiveExpression(data, i);
  if (expression) i = expression.end;
  else return null;

  while (true) {
    const operator = consumeToken(data, i, ShiftOperatorTokenMatcher);
    if (operator) i = operator.end;
    else return expression;

    const right = parseAdditiveExpression(data, operator.end);
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
