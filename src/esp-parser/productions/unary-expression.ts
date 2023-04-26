import { Parser, abrupt, consumeToken } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { Expression, UnaryExpression } from '../ast';
import { UnaryOperatorTokenMatcher } from '../token-matchers';
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

  if (abrupt(operator)) return parseUpdateExpression(data, i);
  i = operator.end;

  const argument = parseUnaryExpression(data, i);
  if (abrupt(argument)) return error(argument);

  return UnaryExpression(
    operator.start,
    argument.end,
    operator.value,
    argument,
  );
};
