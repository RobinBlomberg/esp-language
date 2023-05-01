import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ReturnStatement } from '../ast';
import { parseExpression } from './expression';

export const parseReturnStatement: Parser<ReturnStatement> = (data, i) => {
  const return_ = consume(data, i, TokenType.Keyword, 'return');
  if (abrupt(return_)) return return_;
  i = return_.end;

  const argument = parseExpression(data, i);
  if (abrupt(argument)) return error(argument);
  i = argument.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);

  return ReturnStatement(return_.start, terminator.end, argument);
};
