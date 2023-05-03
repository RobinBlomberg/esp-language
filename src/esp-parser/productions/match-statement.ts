import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { parseExpression } from './expression';
import { parseExpressionList } from './internal/expression-list';
import { parseStatement } from './statement';

export const parseMatchStatement: Parser<IR.MatchStatement> = (data, i) => {
  const match_ = consume(data, i, TokenType.Keyword, Keyword.Match);
  if (match_.abrupt) return match_;
  i = match_.end;

  const openParen = consume(data, i, TokenType.Punctuator, '(');
  if (openParen.abrupt) return error(openParen);
  i = openParen.end;

  const discriminant = parseExpression(data, i);
  if (discriminant.abrupt) return error(discriminant);
  i = discriminant.end;

  const closeParen = consume(data, i, TokenType.Punctuator, ')');
  if (closeParen.abrupt) return error(closeParen);
  i = closeParen.end;

  const openCurly = consume(data, i, TokenType.Punctuator, '{');
  if (openCurly.abrupt) return error(openCurly);
  i = openCurly.end;

  const cases: IR.MatchCase[] = [];
  let alternate: IR.Statement | null = null;

  while (true) {
    const else_ = consume(data, i, TokenType.Keyword, Keyword.Else);
    if (!else_.abrupt) {
      i = else_.end;

      const alternateResult = parseStatement(data, i);
      if (alternateResult.abrupt) return error(alternateResult);
      alternate = alternateResult;
      i = alternate.end;
      break;
    }

    const tests = parseExpressionList(data, i);
    if (tests.abrupt || tests.values.length === 0) break;
    i = tests.end;

    const consequent = parseStatement(data, i);
    if (consequent.abrupt) return error(consequent);
    i = consequent.end;

    cases.push(
      IR.MatchCase(tests.start, consequent.end, tests.values, consequent),
    );
  }

  const closeCurly = consume(data, i, TokenType.Punctuator, '}');
  if (closeCurly.abrupt) return error(closeCurly);

  return IR.MatchStatement(
    openParen.start,
    closeCurly.end,
    discriminant,
    cases,
    alternate,
  );
};
