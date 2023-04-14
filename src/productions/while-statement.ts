import { WhileStatement } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * WhileStatement :
 *   while ( Expression ) Statement
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-WhileStatement
 */
export const parseWhileStatement: Parser<WhileStatement> = (data, i) => {
  const whileKeyword = consume(data, i, TokenType.Name, 'while');
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

  const body = parseStatement(data, i);
  if (!body) return null;

  return WhileStatement(whileKeyword.start, body.end, test, body);
};
