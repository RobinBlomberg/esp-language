import {
  BinaryExpression,
  Expression,
  RelationalOperatorTokenMatcher,
} from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseShiftExpression } from './shift-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * RelationalExpression :
 *   ShiftExpression
 *   RelationalExpression < ShiftExpression
 *   RelationalExpression > ShiftExpression
 *   RelationalExpression <= ShiftExpression
 *   RelationalExpression >= ShiftExpression
 *   RelationalExpression instanceof ShiftExpression
 *   RelationalExpression in ShiftExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * RelationalExpression :
 *   PrivateIdentifier in ShiftExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-RelationalExpression
 */
export const parseRelationalExpression: Parser<Expression> = (data, i) => {
  let expression = parseShiftExpression(data, i);
  if (expression) i = expression.end;
  else return null;

  while (true) {
    const operator = consumeToken(data, i, RelationalOperatorTokenMatcher);
    if (operator) i = operator.end;
    else return expression;

    const right = parseShiftExpression(data, operator.end);
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
