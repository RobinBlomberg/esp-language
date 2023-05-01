import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { MatchCase, MatchStatement, Statement } from '../ast';
import { parseExpression } from './expression';
import { parseExpressionList } from './internal/expression-list';
import { parseStatement } from './statement';

export const parseMatchStatement: Parser<MatchStatement> = (data, i) => {
  const match_ = consume(data, i, TokenType.Keyword, Keyword.Match);
  if (isAbrupt(match_)) return match_;
  i = match_.end;

  const openParen = consume(data, i, TokenType.Punctuator, '(');
  if (isAbrupt(openParen)) return error(openParen);
  i = openParen.end;

  const discriminant = parseExpression(data, i);
  if (isAbrupt(discriminant)) return error(discriminant);
  i = discriminant.end;

  const closeParen = consume(data, i, TokenType.Punctuator, ')');
  if (isAbrupt(closeParen)) return error(closeParen);
  i = closeParen.end;

  const openCurly = consume(data, i, TokenType.Punctuator, '{');
  if (isAbrupt(openCurly)) return error(openCurly);
  i = openCurly.end;

  const cases: MatchCase[] = [];
  let alternate: Statement | null = null;

  while (true) {
    const else_ = consume(data, i, TokenType.Keyword, Keyword.Else);
    if (!isAbrupt(else_)) {
      i = else_.end;

      const alternateResult = parseStatement(data, i);
      if (isAbrupt(alternateResult)) return error(alternateResult);
      alternate = alternateResult;
      i = alternate.end;
      break;
    }

    const tests = parseExpressionList(data, i);
    if (isAbrupt(tests) || tests.values.length === 0) break;
    i = tests.end;

    const consequent = parseStatement(data, i);
    if (isAbrupt(consequent)) return error(consequent);
    i = consequent.end;

    cases.push(
      MatchCase(tests.start, consequent.end, tests.values, consequent),
    );
  }

  const closeCurly = consume(data, i, TokenType.Punctuator, '}');
  if (isAbrupt(closeCurly)) return error(closeCurly);

  return MatchStatement(
    openParen.start,
    closeCurly.end,
    discriminant,
    cases,
    alternate,
  );
};
