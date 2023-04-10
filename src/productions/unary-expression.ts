import { Expression, UnaryExpression, UnaryOperatorTokenMatcher } from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseUpdateExpression } from './update-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * UnaryExpression[Yield, Await] :
 *   UpdateExpression[?Yield, ?Await]
 *   delete UnaryExpression[?Yield, ?Await]
 *   void UnaryExpression[?Yield, ?Await]
 *   typeof UnaryExpression[?Yield, ?Await]
 *   + UnaryExpression[?Yield, ?Await]
 *   - UnaryExpression[?Yield, ?Await]
 *   ~ UnaryExpression[?Yield, ?Await]
 *   ! UnaryExpression[?Yield, ?Await]
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * UnaryExpression[Yield, Await] :
 *   [+Await] AwaitExpression[?Yield]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-UnaryExpression
 */
export const parseUnaryExpression: Parser<Expression> = (data, start) => {
  let i = start;

  const operator = consumeToken(data, i, UnaryOperatorTokenMatcher);

  if (operator) {
    i = operator.end;

    const argument = parseUnaryExpression(data, i);
    if (!argument) return null;

    return UnaryExpression(
      operator.start,
      argument.end,
      operator.value,
      argument,
    );
  }

  return parseUpdateExpression(data, i);
};
