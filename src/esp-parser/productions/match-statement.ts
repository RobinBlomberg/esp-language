import { Parser, TokenType, abrupt, consume, lex } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
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
  const match_ = consume(data, i, TokenType.Keyword, 'match');
  if (abrupt(match_)) return match_;
  i = match_.end;

  const openParen = consume(data, i, TokenType.Punctuator, '(');
  if (abrupt(openParen)) return error(openParen);
  i = openParen.end;

  const discriminant = parseExpression(data, i);
  if (abrupt(discriminant)) return error(discriminant);
  i = discriminant.end;

  const closeParen = consume(data, i, TokenType.Punctuator, ')');
  if (abrupt(closeParen)) return error(closeParen);
  i = closeParen.end;

  const openCurly = consume(data, i, TokenType.Punctuator, '{');
  if (abrupt(openCurly)) return error(openCurly);
  i = openCurly.end;

  const cases: MatchCase[] = [];
  let alternate: Statement | null = null;

  while (true) {
    const else_ = consume(data, i, TokenType.Keyword, 'else');
    if (!abrupt(else_)) {
      i = else_.end;

      const alternateResult = parseStatement(data, i);
      if (abrupt(alternateResult)) return error(alternateResult);
      alternate = alternateResult;
      i = alternate.end;
    }

    const token = lex(data, i);
    if (abrupt(token)) break;
    const test =
      token.value === '{'
        ? parseUnionClause(data, i)
        : parseExpression(data, i);
    if (abrupt(test)) break;
    i = test.end;

    const consequent = parseStatement(data, i);
    if (abrupt(consequent)) return error(consequent);
    i = consequent.end;

    cases.push(MatchCase(test.start, consequent.end, test, consequent));
  }

  const closeCurly = consume(data, i, TokenType.Punctuator, '}');
  if (abrupt(closeCurly)) return error(closeCurly);

  return MatchStatement(
    openParen.start,
    closeCurly.end,
    discriminant,
    cases,
    alternate,
  );
};
