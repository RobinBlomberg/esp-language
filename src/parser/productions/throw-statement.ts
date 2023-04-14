import { Parser, TokenType, consume } from '../../lexer';
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
  const throwKeyword = consume(data, i, TokenType.Keyword, 'throw');
  if (throwKeyword) i = throwKeyword.end;
  else return null;

  const argument = parseExpression(data, i);
  if (argument) i = argument.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (!terminator) return null;

  return ThrowStatement(throwKeyword.start, terminator.end, argument);
};
