import { Keyword, ReturnStatement } from '../../grammar';
import { consume, error, Parser, TokenType } from '../../lexer';
import { parseExpression } from './expression';

export const parseReturnStatement: Parser<ReturnStatement> = (data, i) => {
  const return_ = consume(data, i, TokenType.Keyword, Keyword.Return);
  if (return_.abrupt) return return_;
  i = return_.end;

  const argument = parseExpression(data, i);
  if (argument.abrupt) return error(argument);
  i = argument.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);

  return ReturnStatement(return_.start, terminator.end, argument);
};
