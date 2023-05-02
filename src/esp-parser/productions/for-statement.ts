import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { ForStatement, VariableDeclaration } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';
import { parseVariableDeclaration } from './variable-declaration';

export const parseForStatement: Parser<ForStatement> = (data, i) => {
  const for_ = consume(data, i, TokenType.Keyword, Keyword.For);
  if (for_.abrupt) return for_;
  i = for_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open.abrupt) return error(open);
  i = open.end;

  const initResult = parseVariableDeclaration(data, i);
  let init: VariableDeclaration | null = null;
  if (initResult.abrupt) {
    const initTerminator = consume(data, i, TokenType.Punctuator, ';');
    if (initTerminator.abrupt) return error(initTerminator);
    i = initTerminator.end;
  } else {
    i = initResult.end;
    init = initResult;
  }

  let testTerminator = consume(data, i, TokenType.Punctuator, ';');
  const test = testTerminator.abrupt ? parseExpression(data, i) : null;
  if (test) {
    if (test.abrupt) return error(test);
    i = test.end;
  }
  testTerminator = consume(data, i, TokenType.Punctuator, ';');
  if (testTerminator.abrupt) return error(testTerminator);
  i = testTerminator.end;

  let close = consume(data, i, TokenType.Punctuator, ')');
  const update = close.abrupt ? parseExpression(data, i) : null;
  if (update) {
    if (update.abrupt) return error(update);
    i = update.end;
  }
  close = consume(data, i, TokenType.Punctuator, ')');
  if (close.abrupt) return error(close);
  i = close.end;

  const body = parseStatement(data, i);
  if (body.abrupt) return error(body);

  return ForStatement(for_.start, body.end, init, test, update, body);
};
