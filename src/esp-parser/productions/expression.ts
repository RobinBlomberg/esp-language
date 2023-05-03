import { consumeToken, error, Parser } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { errors } from '../errors';
import { isSimpleNode, lookahead } from '../parser-utils';
import { AssignmentOperatorTokenMatcher } from '../token-matchers';
import { parseConditionalExpression } from './conditional-expression';
import { parseFunction } from './function';

export const parseExpression: Parser<IR.Expression> = (data, i) => {
  const left =
    lookahead(data, i) === ':'
      ? parseFunction(data, i)
      : parseConditionalExpression(data, i);
  if (left.abrupt) return left;
  i = left.end;

  const operator = consumeToken(data, i, AssignmentOperatorTokenMatcher);
  if (operator.abrupt) return left;
  i = operator.end;

  if (!isSimpleNode(left)) {
    throw new ReferenceError(errors.invalidLeftHandSideInAssigment());
  }

  const right = parseExpression(data, operator.end);
  if (right.abrupt) return error(right);

  return IR.AssignmentExpression(
    left.start,
    right.end,
    operator.value,
    left,
    right,
  );
};
