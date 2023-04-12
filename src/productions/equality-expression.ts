import {
  BinaryExpression,
  EqualityOperatorTokenMatcher,
  Expression,
} from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseRelationalExpression } from './relational-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * EqualityExpression :
 *   RelationalExpression
 *   EqualityExpression == RelationalExpression
 *   EqualityExpression != RelationalExpression
 *   EqualityExpression === RelationalExpression
 *   EqualityExpression !== RelationalExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-EqualityExpression
 */
export const parseEqualityExpression: Parser<Expression> = (data, i) => {
  let expression = parseRelationalExpression(data, i);
  if (expression) i = expression.end;
  else return null;

  while (true) {
    const operator = consumeToken(data, i, EqualityOperatorTokenMatcher);
    if (operator) i = operator.end;
    else return expression;

    const right = parseRelationalExpression(data, operator.end);
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
