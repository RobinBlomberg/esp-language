import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { MatchCase, MatchStatement, Statement } from '../ast';
import { parseExpression } from './expression';
import { parseExpressionList } from './internal/expression-list';
import { parseStatement } from './statement';

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
      break;
    }

    const tests = parseExpressionList(data, i);
    if (abrupt(tests) || tests.values.length === 0) break;
    i = tests.end;

    const consequent = parseStatement(data, i);
    if (abrupt(consequent)) return error(consequent);
    i = consequent.end;

    cases.push(
      MatchCase(tests.start, consequent.end, tests.values, consequent),
    );
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
