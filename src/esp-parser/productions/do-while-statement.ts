import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { DoWhileStatement } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

export const parseDoWhileStatement: Parser<DoWhileStatement> = (data, i) => {
  const do_ = consume(data, i, TokenType.Keyword, Keyword.Do);
  if (isAbrupt(do_)) return do_;
  i = do_.end;

  const body = parseStatement(data, i);
  if (isAbrupt(body)) return error(body);
  i = body.end;

  const while_ = consume(data, i, TokenType.Keyword, Keyword.While);
  if (isAbrupt(while_)) return error(while_);
  i = while_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (isAbrupt(open)) return error(open);
  i = open.end;

  const test = parseExpression(data, i);
  if (isAbrupt(test)) return error(test);
  i = test.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (isAbrupt(close)) return error(close);
  i = close.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(terminator)) return error(terminator);

  return DoWhileStatement(do_.start, body.end, body, test);
};
