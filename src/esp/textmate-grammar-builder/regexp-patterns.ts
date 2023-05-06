import { concat, lookahead, lookbehind, one } from '../../regexp';

export const callOpenParen = one('(');

export const functionExpressionOperator = concat(
  one(':'),
  one(/\s/).star(),
  one('(').star(),
);

export const functionDeclarationOperator = concat(
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
