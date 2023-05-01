import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ThrowStatement } from '../ast';
import { parseExpression } from './expression';

export const parseThrowStatement: Parser<ThrowStatement> = (data, i) => {
  const throw_ = consume(data, i, TokenType.Keyword, Keyword.Throw);
  if (isAbrupt(throw_)) return throw_;
  i = throw_.end;

  const argument = parseExpression(data, i);
  if (isAbrupt(argument)) return error(argument);
  i = argument.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(terminator)) return error(terminator);

  return ThrowStatement(throw_.start, terminator.end, argument);
};
