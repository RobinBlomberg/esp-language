import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

export const parseWhileStatement: Parser<IR.LoopStatement> = (data, i) => {
  const while_ = consume(data, i, TokenType.Keyword, Keyword.While);
  if (while_.abrupt) return while_;
  i = while_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open.abrupt) return error(open);
  i = open.end;

  const test = parseExpression(data, i);
  if (test.abrupt) return error(test);
  i = test.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (close.abrupt) return error(close);
  i = close.end;

  const body = parseStatement(data, i);
  if (body.abrupt) return error(body);

  return IR.LoopStatement(while_.start, body.end, null, test, null, body);
};
