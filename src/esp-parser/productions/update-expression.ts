import { Parser, consumeToken } from '../../esp-lexer';
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
  if (prefixOperator) {
    i = prefixOperator.end;

    const argument = parseUnaryExpression(data, i);
    if (!argument) return null;

    if (!isSimpleNode(argument)) {
      throw new SyntaxError(errors.invalidLeftHandSideInAssigment());
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
  if (argument) {
    i = argument.end;

    const postfixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
    if (postfixOperator) {
      if (!isSimpleNode(argument)) {
        throw new SyntaxError(errors.invalidLeftHandSideInAssigment());
      }

      return UpdateExpression(
        argument.start,
        postfixOperator.end,
        postfixOperator.value,
        argument,
        false,
      );
    }

    return argument;
  }

  return null;
};
