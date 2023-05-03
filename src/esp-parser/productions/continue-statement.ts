import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { ContinueStatement } from '../ast';

export const parseContinueStatement: Parser<ContinueStatement> = (data, i) => {
  const continue_ = consume(data, i, TokenType.Keyword, Keyword.Continue);
  if (continue_.abrupt) return continue_;
  i = continue_.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);
  i = terminator.end;

  return ContinueStatement(continue_.start, terminator.end);
};
