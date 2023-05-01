import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { WhileStatement } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

export const parseWhileStatement: Parser<WhileStatement> = (data, i) => {
  const while_ = consume(data, i, TokenType.Keyword, Keyword.While);
  if (isAbrupt(while_)) return while_;
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

  const body = parseStatement(data, i);
  if (isAbrupt(body)) return error(body);

  return WhileStatement(while_.start, body.end, test, body);
};
