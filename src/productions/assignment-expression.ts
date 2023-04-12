import {
  AssignmentExpression,
  AssignmentOperatorTokenMatcher,
  Expression,
} from '../ast';
import { isNodeSimple } from '../ast-utils';
import { errors } from '../errors';
import { Parser, consumeToken } from '../token-utils';
import { parseConditionalExpression } from './conditional-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * AssignmentExpression :
 *   ConditionalExpression
 *   LeftHandSideExpression AssignmentOperator AssignmentExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * AssignmentExpression :
 *   YieldExpression
 *   ArrowFunction
 *   AsyncArrowFunction
 * ```
 */
export const parseAssignmentExpression: Parser<Expression> = (data, i) => {
  const left = parseConditionalExpression(data, i);
  if (left) i = left.end;
  else return null;

  const operator = consumeToken(data, i, AssignmentOperatorTokenMatcher);
  if (operator) i = operator.end;
  else return left;

  if (!isNodeSimple(left)) {
    throw new SyntaxError(errors.invalidLeftHandSideInAssigment());
  }

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
