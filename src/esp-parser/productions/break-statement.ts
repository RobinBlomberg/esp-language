import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { BreakStatement } from '../ast';

export const parseBreakStatement: Parser<BreakStatement> = (data, i) => {
  const break_ = consume(data, i, TokenType.Keyword, 'break');
  if (abrupt(break_)) return break_;
  i = break_.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);
  i = terminator.end;

  return BreakStatement(break_.start, terminator.end);
};
