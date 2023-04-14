import { Parser, TokenType, consume } from '../../lexer';
import { MatchCase, MatchStatement, Statement } from '../ast';
import { parseExpression } from './expression';
import { parseStatement } from './statement';
import { parseUnionClause } from './union-clause';

/**
 * Grammar definition inspired by ECMA-262:
 * ```ecmarkup
 * MatchStatement :
 *   match ( Expression ) CaseBlock
 *
 * CaseBlock :
 *   { CaseClauses }
 *   { CaseClauses else Statement }
 *
 * CaseClauses :
 *   CaseClause
 *   CaseClauses CaseClause
 *
 * CaseClause :
 *   Expression Statement
 *   UnionClause Statement
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-SwitchStatement
 */
export const parseMatchStatement: Parser<MatchStatement> = (data, i) => {
  const matchKeyword = consume(data, i, TokenType.Keyword, 'match');
  if (matchKeyword) i = matchKeyword.end;
  else return null;

  const openParen = consume(data, i, TokenType.Punctuator, '(');
  if (openParen) i = openParen.end;
  else return null;

  const discriminant = parseExpression(data, i);
  if (discriminant) i = discriminant.end;
  else return null;

  const closeParen = consume(data, i, TokenType.Punctuator, ')');
  if (closeParen) i = closeParen.end;
  else return null;

  const openCurly = consume(data, i, TokenType.Punctuator, '{');
  if (openCurly) i = openCurly.end;
  else return null;

  const cases: MatchCase[] = [];
  let alternate: Statement | null = null;

  while (true) {
    const elseKeyword = consume(data, i, TokenType.Keyword, 'else');
    if (elseKeyword) {
      i = elseKeyword.end;

      alternate = parseStatement(data, i);
      if (alternate) i = alternate.end;
      else return null;
    }

    const test = parseExpression(data, i) ?? parseUnionClause(data, i);
    if (test) i = test.end;
    else break;

    const consequent = parseStatement(data, i);
    if (consequent) i = consequent.end;
    else return null;

    cases.push(MatchCase(test.start, consequent.end, test, consequent));
  }

  const closeCurly = consume(data, i, TokenType.Punctuator, '}');
  if (!closeCurly) return null;

  return MatchStatement(
    openParen.start,
    closeCurly.end,
    discriminant,
    cases,
    alternate,
  );
};
