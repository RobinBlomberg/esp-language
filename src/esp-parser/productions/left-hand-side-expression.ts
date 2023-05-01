import { Parser, isAbrupt } from '../../esp-lexer';
import { CallExpression, Expression } from '../ast';
import { parseArguments } from './internal/arguments';
import { parseMemberExpression } from './member-expression';

export const parseLeftHandSideExpression: Parser<Expression> = (data, i) => {
  let callee = parseMemberExpression(data, i);
  if (isAbrupt(callee)) return callee;

  while (true) {
    const args = parseArguments(data, callee.end);
    if (isAbrupt(args)) return args.type === 'Unused' ? callee : args;

    callee = CallExpression(callee.start, args.end, callee, args.arguments);
    continue;
  }
};
