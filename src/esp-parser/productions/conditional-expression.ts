import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { parseExpression } from './expression';
import { parseLogicalORExpression } from './logical-or-expression';

export const parseConditionalExpression: Parser<IR.Expression> = (data, i) => {
  const test = parseLogicalORExpression(data, i);
  if (test.abrupt) return test;
  i = test.end;

  const consequentOperator = consume(data, i, TokenType.Punctuator, '?');
  if (consequentOperator.abrupt) return test;
  i = consequentOperator.end;

  const consequent = parseExpression(data, i);
  if (consequent.abrupt) return error(consequent);
  i = consequent.end;

  const alternateOperator = consume(data, i, TokenType.Punctuator, ':');
  if (alternateOperator.abrupt) return error(alternateOperator);
  i = alternateOperator.end;

  const alternate = parseExpression(data, i);
  if (alternate.abrupt) return error(alternate);

  return IR.ConditionalExpression(
    test.start,
    alternate.end,
    test,
    consequent,
    alternate,
  );
};
