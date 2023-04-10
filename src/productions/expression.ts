import { Expression } from '../ast';
import { Parser } from '../parser-utils';
import { parseMemberExpression } from './member-expression';

/**
 * Not supported from ECMA-262:
 * ```ecmarkup
 * Expression[In, Yield, Await] :
 *   AssignmentExpression[?In, ?Yield, ?Await]
 *   Expression[?In, ?Yield, ?Await] , AssignmentExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Expression
 */
export const parseExpression: Parser<Expression> = (data, start) => {
  return parseMemberExpression(data, start);
};
