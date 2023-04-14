import { ReturnStatement } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseExpression } from './expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ReturnStatement :
 *   return Expression ;
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * ReturnStatement :
 *   return ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ReturnStatement
 */
export const parseReturnStatement: Parser<ReturnStatement> = (data, i) => {
  const returnKeyword = consume(data, i, TokenType.Keyword, 'return');
  if (returnKeyword) i = returnKeyword.end;
  else return null;

  const argument = parseExpression(data, i);
  if (argument) i = argument.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (!terminator) return null;

  return ReturnStatement(returnKeyword.start, terminator.end, argument);
};
