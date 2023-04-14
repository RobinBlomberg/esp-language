import { Parser, TokenType, consume } from '../../lexer';
import { DoWhileStatement } from '../ast';
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
  const doKeyword = consume(data, i, TokenType.Keyword, 'do');
  if (doKeyword) i = doKeyword.end;
  else return null;

  const body = parseStatement(data, i);
  if (body) i = body.end;
  else return null;

  const whileKeyword = consume(data, i, TokenType.Keyword, 'while');
  if (whileKeyword) i = whileKeyword.end;
  else return null;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open) i = open.end;
  else return null;

  const test = parseExpression(data, i);
  if (test) i = test.end;
  else return null;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (close) i = close.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (!terminator) return null;

  return DoWhileStatement(doKeyword.start, body.end, body, test);
};
