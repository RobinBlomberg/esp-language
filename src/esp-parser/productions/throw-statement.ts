import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ThrowStatement } from '../ast';
import { parseExpression } from './expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ThrowStatement :
 *   throw Expression ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ThrowStatement
 */
export const parseThrowStatement: Parser<ThrowStatement> = (data, i) => {
  const throw_ = consume(data, i, TokenType.Keyword, 'throw');
  if (abrupt(throw_)) return throw_;
  i = throw_.end;

  const argument = parseExpression(data, i);
  if (abrupt(argument)) return error(argument);
  i = argument.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);

  return ThrowStatement(throw_.start, terminator.end, argument);
};
