import { CallExpression, Expression } from '../ast';
import { Parser } from '../token-utils';
import { parseArguments } from './arguments';
import { parseMemberExpression } from './member-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * LeftHandSideExpression[Yield, Await] :
 *   NewExpression[?Yield, ?Await]
 *   CallExpression[?Yield, ?Await]
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * LeftHandSideExpression[Yield, Await] :
 *   OptionalExpression[?Yield, ?Await]
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
    const arguments_ = parseArguments(data, callee.end);
    if (arguments_) {
      callee = CallExpression(callee.start, arguments_.end, callee, arguments_);
      continue;
    }

    return callee;
  }
};
