import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir';

export const parseBreakStatement: Parser<IR.BreakStatement> = (data, i) => {
  const break_ = consume(data, i, TokenType.Keyword, Keyword.Break);
  if (break_.abrupt) return break_;
  i = break_.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);
  i = terminator.end;

  return IR.BreakStatement(break_.start, terminator.end);
};
