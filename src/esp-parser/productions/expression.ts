import { Parser, abrupt, consumeToken } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
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
  if (abrupt(left)) return left;
  i = left.end;

  const operator = consumeToken(data, i, AssignmentOperatorTokenMatcher);
  if (abrupt(operator)) return left;
  i = operator.end;

  if (!isSimpleNode(left)) {
    throw new ReferenceError(errors.invalidLeftHandSideInAssigment());
  }

  const right = parseExpression(data, operator.end);
  if (abrupt(right)) return error(right);

  return AssignmentExpression(
    left.start,
    right.end,
    operator.value,
    left,
    right,
  );
};
