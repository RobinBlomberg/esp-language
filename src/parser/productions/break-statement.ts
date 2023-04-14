import { Parser, TokenType, consume } from '../../lexer';
import { BreakStatement } from '../ast';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * BreakStatement :
 *   break ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BreakStatement
 */
export const parseBreakStatement: Parser<BreakStatement> = (data, i) => {
  const breakKeyword = consume(data, i, TokenType.Keyword, 'break');
  if (breakKeyword) i = breakKeyword.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator) i = terminator.end;
  else return null;

  return BreakStatement(breakKeyword.start, terminator.end);
};
