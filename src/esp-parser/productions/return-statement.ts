import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir';
import { parseExpression } from './expression';

export const parseReturnStatement: Parser<IR.ReturnStatement> = (data, i) => {
  const return_ = consume(data, i, TokenType.Keyword, Keyword.Return);
  if (return_.abrupt) return return_;
  i = return_.end;

  const argument = parseExpression(data, i);
  if (argument.abrupt) return error(argument);
  i = argument.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);

  return IR.ReturnStatement(return_.start, terminator.end, argument);
};
