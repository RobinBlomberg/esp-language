import { ContinueStatement } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';

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
  const continueKeyword = consume(data, i, TokenType.Name, 'continue');
  if (continueKeyword) i = continueKeyword.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator) i = terminator.end;
  else return null;

  return ContinueStatement(continueKeyword.start, terminator.end);
};
