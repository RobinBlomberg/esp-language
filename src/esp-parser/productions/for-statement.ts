import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ForStatement, VariableDeclaration } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';
import { parseVariableDeclaration } from './variable-declaration';

export const parseForStatement: Parser<ForStatement> = (data, i) => {
  const for_ = consume(data, i, TokenType.Keyword, Keyword.For);
  if (isAbrupt(for_)) return for_;
  i = for_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (isAbrupt(open)) return error(open);
  i = open.end;

  const initResult = parseVariableDeclaration(data, i);
  let init: VariableDeclaration | null = null;
  if (isAbrupt(initResult)) {
    const initTerminator = consume(data, i, TokenType.Punctuator, ';');
    if (isAbrupt(initTerminator)) return error(initTerminator);
    i = initTerminator.end;
  } else {
    i = initResult.end;
    init = initResult;
  }

  let testTerminator = consume(data, i, TokenType.Punctuator, ';');
  const test = isAbrupt(testTerminator) ? parseExpression(data, i) : null;
  if (test) {
    if (isAbrupt(test)) return error(test);
    i = test.end;
  }
  testTerminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(testTerminator)) return error(testTerminator);
  i = testTerminator.end;

  let close = consume(data, i, TokenType.Punctuator, ')');
  const update = isAbrupt(close) ? parseExpression(data, i) : null;
  if (update) {
    if (isAbrupt(update)) return error(update);
    i = update.end;
  }
  close = consume(data, i, TokenType.Punctuator, ')');
  if (isAbrupt(close)) return error(close);
  i = close.end;

  const body = parseStatement(data, i);
  if (isAbrupt(body)) return error(body);

  return ForStatement(for_.start, body.end, init, test, update, body);
};
