import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ContinueStatement } from '../ast';

export const parseContinueStatement: Parser<ContinueStatement> = (data, i) => {
  const continue_ = consume(data, i, TokenType.Keyword, Keyword.Continue);
  if (isAbrupt(continue_)) return continue_;
  i = continue_.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(terminator)) return error(terminator);
  i = terminator.end;

  return ContinueStatement(continue_.start, terminator.end);
};
