import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ReturnStatement } from '../ast';
import { parseExpression } from './expression';

export const parseReturnStatement: Parser<ReturnStatement> = (data, i) => {
  const return_ = consume(data, i, TokenType.Keyword, Keyword.Return);
  if (isAbrupt(return_)) return return_;
  i = return_.end;

  const argument = parseExpression(data, i);
  if (isAbrupt(argument)) return error(argument);
  i = argument.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(terminator)) return error(terminator);

  return ReturnStatement(return_.start, terminator.end, argument);
};
