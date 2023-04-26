import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ContinueStatement } from '../ast';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ContinueStatement[Yield, Await] :
 *   continue ;
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 *   continue LabelIdentifier ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ContinueStatement
 */
export const parseContinueStatement: Parser<ContinueStatement> = (data, i) => {
  const continue_ = consume(data, i, TokenType.Keyword, 'continue');
  if (abrupt(continue_)) return continue_;
  i = continue_.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);
  i = terminator.end;

  return ContinueStatement(continue_.start, terminator.end);
};
