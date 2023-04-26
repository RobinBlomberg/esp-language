import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { IfStatement, Statement } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * IfStatement :
 *   if ( Expression ) Statement
 *   if ( Expression ) Statement else Statement
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-IfStatement
 */
export const parseIfStatement: Parser<IfStatement> = (data, i) => {
  const if_ = consume(data, i, TokenType.Keyword, 'if');
  if (abrupt(if_)) return if_;
  i = if_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (abrupt(open)) return error(open);
  i = open.end;

  const test = parseExpression(data, i);
  if (abrupt(test)) return error(test);
  i = test.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (abrupt(close)) return error(close);
  i = close.end;

  const consequent = parseStatement(data, i);
  if (abrupt(consequent)) return error(consequent);
  i = consequent.end;

  const else_ = consume(data, i, TokenType.Keyword, 'else');
  let alternate: Statement | null = null;

  if (!abrupt(else_)) {
    i = else_.end;

    const alternateResult = parseStatement(data, i);
    if (abrupt(alternateResult)) return error(alternateResult);
    alternate = alternateResult;
  }

  return IfStatement(
    if_.start,
    (alternate ?? consequent).end,
    test,
    consequent,
    alternate,
  );
};
