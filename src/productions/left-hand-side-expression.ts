import { CallExpression, Expression } from '../ast';
import { Parser } from '../token-utils';
import { parseArguments } from './arguments';
import { parseMemberExpression } from './member-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * LeftHandSideExpression :
 *   NewExpression
 *   CallExpression
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * LeftHandSideExpression :
 *   OptionalExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-LeftHandSideExpression
 */
export const parseLeftHandSideExpression: Parser<Expression> = (
  data,
  start,
) => {
  let callee = parseMemberExpression(data, start);
  if (!callee) return null;

  while (true) {
    const args = parseArguments(data, callee.end);
    if (args === undefined) return callee;
    else if (args === null) return null;

    callee = CallExpression(callee.start, args.end, callee, args.arguments);
    continue;
  }
};
