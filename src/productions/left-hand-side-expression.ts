import { CallExpression, Expression } from '../ast';
import { Parser } from '../token-utils';
import { parseArguments } from './arguments';
import { parseMemberExpression } from './member-expression';

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
