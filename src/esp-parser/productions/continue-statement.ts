import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ContinueStatement } from '../ast';

export const parseContinueStatement: Parser<ContinueStatement> = (data, i) => {
  const continue_ = consume(data, i, TokenType.Keyword, 'continue');
  if (abrupt(continue_)) return continue_;
  i = continue_.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);
  i = terminator.end;

  return ContinueStatement(continue_.start, terminator.end);
};
