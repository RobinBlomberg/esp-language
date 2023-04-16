import { Parser, consumeToken } from '../../lexer';
import { AssignmentExpression, Expression } from '../ast';
import { errors } from '../errors';
import { isSimpleNode } from '../parser-utils';
import { AssignmentOperatorTokenMatcher } from '../token-matchers';
import { parseConditionalExpression } from './conditional-expression';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * Expression :
 *   ConditionalExpression
 *   LeftHandSideExpression AssignmentOperator Expression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * AssignmentExpression :
 *   YieldExpression
 *   ArrowFunction
 *   AsyncArrowFunction
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Expression
 */
export const parseExpression: Parser<Expression> = (data, i) => {
  const left = parseConditionalExpression(data, i);
  if (left) i = left.end;
  else return null;

  const operator = consumeToken(data, i, AssignmentOperatorTokenMatcher);
  if (operator) i = operator.end;
  else return left;

  if (!isSimpleNode(left)) {
    throw new SyntaxError(errors.invalidLeftHandSideInAssigment());
  }

  const right = parseExpression(data, operator.end);
  if (!right) return null;

  return AssignmentExpression(
    left.start,
    right.end,
    operator.value,
    left,
    right,
  );
};
