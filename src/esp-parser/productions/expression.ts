import { Parser, consumeToken, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { AssignmentExpression, Expression } from '../ast';
import { errors } from '../errors';
import { isSimpleNode, lookahead } from '../parser-utils';
import { AssignmentOperatorTokenMatcher } from '../token-matchers';
import { parseConditionalExpression } from './conditional-expression';
import { parseFunction } from './function';

export const parseExpression: Parser<Expression> = (data, i) => {
  const left =
    lookahead(data, i) === ':'
      ? parseFunction(data, i)
      : parseConditionalExpression(data, i);
  if (isAbrupt(left)) return left;
  i = left.end;

  const operator = consumeToken(data, i, AssignmentOperatorTokenMatcher);
  if (isAbrupt(operator)) return left;
  i = operator.end;

  if (!isSimpleNode(left)) {
    throw new ReferenceError(errors.invalidLeftHandSideInAssigment());
  }

  const right = parseExpression(data, operator.end);
  if (isAbrupt(right)) return error(right);

  return AssignmentExpression(
    left.start,
    right.end,
    operator.value,
    left,
    right,
  );
};
