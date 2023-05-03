import {
  ForOfStatement,
  ForStatement,
  Keyword,
  VariableDeclaration,
} from '../../grammar';
import { Parser, TokenType, consume, consumeToken, error } from '../../lexer';
import { lookahead } from '../parser-utils';
import {
  ForStatementInitTokenMatcher,
  VariableKindTokenMatcher,
} from '../token-matchers';
import { parseExpression } from './expression';
import { parseIdentifier } from './identifier';
import { parseStatement } from './statement';

export const parseForStatement: Parser<ForOfStatement | ForStatement> = (
  data,
  i,
) => {
  const for_ = consume(data, i, TokenType.Keyword, Keyword.For);
  if (for_.abrupt) return for_;
  i = for_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open.abrupt) return error(open);
  i = open.end;

  const kind = consumeToken(data, i, VariableKindTokenMatcher);
  let init: VariableDeclaration | null = null;
  if (!kind.abrupt) {
    i = kind.end;

    const id = parseIdentifier(data, i);
    if (id.abrupt) return error(id);
    i = id.end;

    const operator = consumeToken(data, i, ForStatementInitTokenMatcher);
    if (operator.abrupt) return error(operator);
    i = operator.end;

    if (operator.value === Keyword.Of) {
      const right = parseExpression(data, i);
      if (right.abrupt) return error(right);
      i = right.end;

      const close = consume(data, i, TokenType.Punctuator, ')');
      if (close.abrupt) return error(close);
      i = close.end;

      const body = parseStatement(data, i);
      if (body.abrupt) return error(body);

      return ForOfStatement(for_.start, body.end, id, right, body);
    }

    const init_ = parseExpression(data, i);
    if (init_.abrupt) return error(init_);
    i = init_.end;
    init = VariableDeclaration(kind.start, init_.end, kind.value, id, init_);
  }

  const initTerm = consume(data, i, TokenType.Punctuator, ';');
  if (initTerm.abrupt) return error(initTerm);
  i = initTerm.end;

  const test = lookahead(data, i) === ';' ? null : parseExpression(data, i);
  if (test) {
    if (test.abrupt) return error(test);
    i = test.end;
  }

  const testTerm = consume(data, i, TokenType.Punctuator, ';');
  if (testTerm.abrupt) return error(testTerm);
  i = testTerm.end;

  const update = lookahead(data, i) === ')' ? null : parseExpression(data, i);
  if (update) {
    if (update.abrupt) return error(update);
    i = update.end;
  }

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (close.abrupt) return error(close);
  i = close.end;

  const body = parseStatement(data, i);
  if (body.abrupt) return error(body);

  return ForStatement(for_.start, body.end, init, test, update, body);
};
