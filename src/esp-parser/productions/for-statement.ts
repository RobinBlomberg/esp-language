import { Keyword } from '../../esp-grammar';
import {
  Parser,
  TokenType,
  consume,
  consumeToken,
  isAbrupt,
} from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ForOfStatement, ForStatement, VariableDeclaration } from '../ast';
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
  if (isAbrupt(for_)) return for_;
  i = for_.end;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (isAbrupt(open)) return error(open);
  i = open.end;

  const kind = consumeToken(data, i, VariableKindTokenMatcher);
  if (isAbrupt(kind)) return error(kind);
  i = kind.end;

  const id = parseIdentifier(data, i);
  if (isAbrupt(id)) return error(id);
  i = id.end;

  const operator = consumeToken(data, i, ForStatementInitTokenMatcher);
  if (isAbrupt(operator)) return error(operator);
  i = operator.end;

  if (operator.value === Keyword.Of) {
    const right = parseExpression(data, i);
    if (isAbrupt(right)) return error(right);
    i = right.end;

    const close = consume(data, i, TokenType.Punctuator, ')');
    if (isAbrupt(close)) return error(close);
    i = close.end;

    const body = parseStatement(data, i);
    if (isAbrupt(body)) return error(body);

    return ForOfStatement(for_.start, body.end, id, right, body);
  }

  const declarationInit = parseExpression(data, i);
  if (isAbrupt(declarationInit)) return error(declarationInit);
  i = declarationInit.end;

  const init = VariableDeclaration(
    kind.start,
    declarationInit.end,
    kind.value,
    id,
    declarationInit,
  );

  const initTerminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(initTerminator)) return error(initTerminator);
  i = initTerminator.end;

  const test = lookahead(data, i) === ';' ? null : parseExpression(data, i);
  if (test) {
    if (isAbrupt(test)) return error(test);
    i = test.end;
  }

  const testTerminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(testTerminator)) return error(testTerminator);
  i = testTerminator.end;

  const update = lookahead(data, i) === ';' ? null : parseExpression(data, i);
  if (update) {
    if (isAbrupt(update)) return error(update);
    i = update.end;
  }

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (isAbrupt(close)) return error(close);
  i = close.end;

  const body = parseStatement(data, i);
  if (isAbrupt(body)) return error(body);

  return ForStatement(for_.start, body.end, init, test, update, body);
};
