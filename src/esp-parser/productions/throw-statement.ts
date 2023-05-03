import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { ThrowStatement } from '../ast';
import { parseExpression } from './expression';

export const parseThrowStatement: Parser<ThrowStatement> = (data, i) => {
  const throw_ = consume(data, i, TokenType.Keyword, Keyword.Throw);
  if (throw_.abrupt) return throw_;
  i = throw_.end;

  const argument = parseExpression(data, i);
  if (argument.abrupt) return error(argument);
  i = argument.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);

  return ThrowStatement(throw_.start, terminator.end, argument);
};
