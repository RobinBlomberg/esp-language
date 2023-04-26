import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { WhileStatement } from '../ast';
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
  const while_ = consume(data, i, TokenType.Keyword, 'while');
  if (abrupt(while_)) return while_;
  i = while_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (abrupt(open)) return error(open);
  i = open.end;

  const test = parseExpression(data, i);
  if (abrupt(test)) return error(test);
  i = test.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (abrupt(close)) return error(close);
  i = close.end;

  const body = parseStatement(data, i);
  if (abrupt(body)) return error(body);

  return WhileStatement(while_.start, body.end, test, body);
};
