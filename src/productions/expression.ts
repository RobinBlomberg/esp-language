import { Expression } from '../nodes';
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
export const parseExpression = (
  data: string,
  start: number,
): Expression | null => {
  return parseMemberExpression(data, start);
};
