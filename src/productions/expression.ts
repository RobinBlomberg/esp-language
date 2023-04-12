import { Expression } from '../ast';
import { Parser } from '../token-utils';
import { parseMemberExpression } from './member-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * Expression :
 *   AssignmentExpression
 *   Expression , AssignmentExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Expression
 */
export const parseExpression: Parser<Expression> = (data, start) => {
  return parseMemberExpression(data, start);
};
