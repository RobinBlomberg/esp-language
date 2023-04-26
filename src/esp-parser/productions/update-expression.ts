import { Parser, abrupt, consumeToken } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { Expression, UpdateExpression } from '../ast';
import { errors } from '../errors';
import { isSimpleNode } from '../parser-utils';
import { UpdateOperatorTokenMatcher } from '../token-matchers';
import { parseLeftHandSideExpression } from './left-hand-side-expression';
import { parseUnaryExpression } from './unary-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * UpdateExpression :
 *   LeftHandSideExpression
 *   LeftHandSideExpression ++
 *   LeftHandSideExpression --
 *   ++ UnaryExpression
 *   -- UnaryExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-UpdateExpression
 */
export const parseUpdateExpression: Parser<Expression> = (data, i) => {
  const prefixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
  if (!abrupt(prefixOperator)) {
    i = prefixOperator.end;

    const argument = parseUnaryExpression(data, i);
    if (abrupt(argument)) return error(argument);
    if (!isSimpleNode(argument)) {
      throw new ReferenceError(errors.invalidLeftHandSideInAssigment());
    }

    return UpdateExpression(
      prefixOperator.start,
      argument.end,
      prefixOperator.value,
      argument,
      true,
    );
  }

  const argument = parseLeftHandSideExpression(data, i);
  if (abrupt(argument)) return argument;
  i = argument.end;

  const postfixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
  if (abrupt(postfixOperator)) return argument;
  if (!isSimpleNode(argument)) {
    throw new ReferenceError(errors.invalidLeftHandSideInAssigment());
  }

  return UpdateExpression(
    argument.start,
    postfixOperator.end,
    postfixOperator.value,
    argument,
    false,
  );
};
