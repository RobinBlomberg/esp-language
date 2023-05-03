import { BreakStatement, Keyword } from '../../grammar';
import { consume, error, Parser, TokenType } from '../../lexer';

export const parseBreakStatement: Parser<BreakStatement> = (data, i) => {
  const break_ = consume(data, i, TokenType.Keyword, Keyword.Break);
  if (break_.abrupt) return break_;
  i = break_.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);
  i = terminator.end;

  return BreakStatement(break_.start, terminator.end);
};
