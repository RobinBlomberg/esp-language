import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { DoWhileStatement } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

export const parseDoWhileStatement: Parser<DoWhileStatement> = (data, i) => {
  const do_ = consume(data, i, TokenType.Keyword, Keyword.Do);
  if (do_.abrupt) return do_;
  i = do_.end;

  const body = parseStatement(data, i);
  if (body.abrupt) return error(body);
  i = body.end;

  const while_ = consume(data, i, TokenType.Keyword, Keyword.While);
  if (while_.abrupt) return error(while_);
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

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);

  return DoWhileStatement(do_.start, body.end, body, test);
};
