import { DoWhileStatement } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * DoWhileStatement :
 *   do Statement while ( Expression ) ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-DoWhileStatement
 */
export const parseDoWhileStatement: Parser<DoWhileStatement> = (data, i) => {
  const doKeyword = consume(data, i, TokenType.Name, 'do');
  if (doKeyword) i = doKeyword.end;
  else return null;

  const body = parseStatement(data, i);
  if (body) i = body.end;
  else return null;

  const whileKeyword = consume(data, i, TokenType.Name, 'while');
  if (whileKeyword) i = whileKeyword.end;
  else return null;

  const openParen = consume(data, i, TokenType.Punctuator, '(');
  if (openParen) i = openParen.end;
  else return null;

  const test = parseExpression(data, i);
  if (test) i = test.end;
  else return null;

  const closeParen = consume(data, i, TokenType.Punctuator, ')');
  if (closeParen) i = closeParen.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (!terminator) return null;

  return DoWhileStatement(doKeyword.start, body.end, body, test);
};
