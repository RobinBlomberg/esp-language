import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ConditionalExpression, Expression } from '../ast';
import { parseExpression } from './expression';
import { parseLogicalORExpression } from './logical-or-expression';

export const parseConditionalExpression: Parser<Expression> = (data, i) => {
  const test = parseLogicalORExpression(data, i);
  if (isAbrupt(test)) return test;
  i = test.end;

  const consequentOperator = consume(data, i, TokenType.Punctuator, '?');
  if (isAbrupt(consequentOperator)) return test;
  i = consequentOperator.end;

  const consequent = parseExpression(data, i);
  if (isAbrupt(consequent)) return error(consequent);
  i = consequent.end;

  const alternateOperator = consume(data, i, TokenType.Punctuator, ':');
  if (isAbrupt(alternateOperator)) return error(alternateOperator);
  i = alternateOperator.end;

  const alternate = parseExpression(data, i);
  if (isAbrupt(alternate)) return error(alternate);

  return ConditionalExpression(
    test.start,
    alternate.end,
    test,
    consequent,
    alternate,
  );
};
