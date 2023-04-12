import {
  AssignmentExpression,
  AssignmentOperatorTokenMatcher,
  Expression,
} from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * AssignmentExpression :
 *   LeftHandSideExpression AssignmentOperator AssignmentExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * AssignmentExpression :
 *   ConditionalExpression
 *   YieldExpression
 *   ArrowFunction
 *   AsyncArrowFunction
 * ```
 */
export const parseAssignmentExpression: Parser<Expression> = (data, i) => {
  const left = parseLeftHandSideExpression(data, i);
  if (left) i = left.end;
  else return null;

  const operator = consumeToken(data, i, AssignmentOperatorTokenMatcher);
  if (operator) i = operator.end;
  else return left;

  const right = parseAssignmentExpression(data, operator.end);
  if (!right) return null;

  return AssignmentExpression(
    left.start,
    right.end,
    operator.value,
    left,
    right,
  );
};
