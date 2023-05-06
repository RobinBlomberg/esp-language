import { concat, group, lookahead, lookbehind, one } from '../../utils/regexp';

export const callOpenParen = one('(');

export const functionExpressionOperator = group(
  one(':'),
  one(/\s/).star(),
  one('(').star(),
);

export const functionDeclarationOperator = group(
  one('='),
  one(/\s/).star(),
  functionExpressionOperator,
);

export const identifier = concat(
  lookbehind.not(one(/[a-zA-Z0-9$_]/)),
  one(/[a-zA-Z$_]/),
  one(/[a-zA-Z0-9$_]/).star(),
  lookahead.not(one(/[a-zA-Z0-9$_]/)),
);
