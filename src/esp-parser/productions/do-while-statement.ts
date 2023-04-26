import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
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
  const do_ = consume(data, i, TokenType.Keyword, 'do');
  if (abrupt(do_)) return do_;
  i = do_.end;

  const body = parseStatement(data, i);
  if (abrupt(body)) return error(body);
  i = body.end;

  const while_ = consume(data, i, TokenType.Keyword, 'while');
  if (abrupt(while_)) return error(while_);
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

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);

  return DoWhileStatement(do_.start, body.end, body, test);
};
