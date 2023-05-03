import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IfStatement, Statement } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

export const parseIfStatement: Parser<IfStatement> = (data, i) => {
  const if_ = consume(data, i, TokenType.Keyword, Keyword.If);
  if (if_.abrupt) return if_;
  i = if_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open.abrupt) return error(open);
  i = open.end;

  const test = parseExpression(data, i);
  if (test.abrupt) return error(test);
  i = test.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (close.abrupt) return error(close);
  i = close.end;

  const consequent = parseStatement(data, i);
  if (consequent.abrupt) return error(consequent);
  i = consequent.end;

  const else_ = consume(data, i, TokenType.Keyword, Keyword.Else);
  let alternate: Statement | null = null;

  if (!else_.abrupt) {
    i = else_.end;

    const alternateResult = parseStatement(data, i);
    if (alternateResult.abrupt) return error(alternateResult);
    alternate = alternateResult;
  }

  return IfStatement(
    if_.start,
    (alternate ?? consequent).end,
    test,
    consequent,
    alternate,
  );
};
