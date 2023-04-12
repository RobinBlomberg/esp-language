import {
  Expression,
  UpdateExpression,
  UpdateOperatorTokenMatcher,
} from '../ast';
import { isNodeSimple } from '../ast-utils';
import { errors } from '../errors';
import { Parser, consumeToken } from '../token-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';
import { parseUnaryExpression } from './unary-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * UpdateExpression[Yield, Await] :
 *   LeftHandSideExpression[?Yield, ?Await]
 *   LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] ++
 *   LeftHandSideExpression[?Yield, ?Await] [no LineTerminator here] --
 *   ++ UnaryExpression[?Yield, ?Await]
 *   -- UnaryExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-UpdateExpression
 */
export const parseUpdateExpression: Parser<Expression> = (data, start) => {
  let i = start;

  const prefixOperator = consumeToken(data, i, UpdateOperatorTokenMatcher);
  if (prefixOperator) {
    i = prefixOperator.end;

    const argument = parseUnaryExpression(data, i);
    if (!argument) return null;

    if (!isNodeSimple(argument)) {
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
      if (!isNodeSimple(argument)) {
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
