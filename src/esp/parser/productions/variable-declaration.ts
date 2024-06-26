import { VariableDeclaration } from '../../grammar';
import { consume, consumeToken, error, Parser, TokenType } from '../../lexer';
import { VariableKindTokenMatcher } from '../token-matchers';
import { parseExpression } from './expression';
import { parseIdentifier } from './identifier';

export const parseVariableDeclaration: Parser<VariableDeclaration> = (
  data,
  i,
) => {
  const kind = consumeToken(data, i, VariableKindTokenMatcher);
  if (kind.abrupt) return kind;
  i = kind.end;

  const id = parseIdentifier(data, i);
  if (id.abrupt) return error(id);
  i = id.end;

  const operator = consume(data, i, TokenType.Punctuator, '=');
  if (operator.abrupt) return error(operator);
  i = operator.end;

  const init = parseExpression(data, i);
  if (init.abrupt) return error(init);
  i = init.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);

  return VariableDeclaration(kind.start, terminator.end, kind.value, id, init);
};
