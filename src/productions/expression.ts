import { Expression } from '../ast';
import { Parser } from '../parser-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';

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
  return parseLeftHandSideExpression(data, start);
};
