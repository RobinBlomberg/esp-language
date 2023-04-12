import { IfStatement, Statement } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseExpression } from './expression';
import { parseStatement } from './statement';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * IfStatement :
 *   if ( Expression ) Statement
 *   if ( Expression ) Statement else Statement
 * ```
 */
export const parseIfStatement: Parser<IfStatement> = (data, i) => {
  const ifKeyword = consume(data, i, TokenType.Name, 'if');
  if (ifKeyword) i = ifKeyword.end;
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

  const consequent = parseStatement(data, i);
  if (consequent) i = consequent.end;
  else return null;

  const elseKeyword = consume(data, i, TokenType.Name, 'else');
  let alternate: Statement | null = null;

  if (elseKeyword) {
    i = elseKeyword.end;

    alternate = parseStatement(data, i);
    if (!alternate) return null;
  }

  return IfStatement(
    ifKeyword.start,
    (alternate ?? consequent).end,
    test,
    consequent,
    alternate,
  );
};
