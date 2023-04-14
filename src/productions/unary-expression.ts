import { Expression, UnaryExpression, UnaryOperatorTokenMatcher } from '../ast';
import { Parser, consumeToken } from '../token-utils';
import { parseUpdateExpression } from './update-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * UnaryExpression :
 *   UpdateExpression
 *   + UnaryExpression
 *   - UnaryExpression
 *   ! UnaryExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * UnaryExpression :
 *   delete UnaryExpression
 *   void UnaryExpression
 *   typeof UnaryExpression
 *   ~ UnaryExpression
 *   AwaitExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-UnaryExpression
 */
export const parseUnaryExpression: Parser<Expression> = (data, i) => {
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
