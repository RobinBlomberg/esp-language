import { CallExpression, Expression } from '../../esp-grammar/ast';
import { Parser } from '../../esp-lexer';
import { parseArguments } from './internal/arguments';
import { parseMemberExpression } from './member-expression';

export const parseLeftHandSideExpression: Parser<Expression> = (data, i) => {
  let callee = parseMemberExpression(data, i);
  if (callee.abrupt) return callee;

  while (true) {
    const args = parseArguments(data, callee.end);
    if (args.abrupt) return args.abrupt === 'Unused' ? callee : args;

    callee = CallExpression(callee.start, args.end, callee, args.arguments);
    continue;
  }
};
