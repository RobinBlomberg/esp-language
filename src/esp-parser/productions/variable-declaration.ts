import {
  Parser,
  TokenType,
  consume,
  consumeToken,
  isAbrupt,
} from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { VariableDeclaration } from '../ast';
import { VariableKindTokenMatcher } from '../token-matchers';
import { parseExpression } from './expression';
import { parseIdentifier } from './identifier';

export const parseVariableDeclaration: Parser<VariableDeclaration> = (
  data,
  i,
) => {
  const kind = consumeToken(data, i, VariableKindTokenMatcher);
  if (isAbrupt(kind)) return kind;
  i = kind.end;

  const id = parseIdentifier(data, i);
  if (isAbrupt(id)) return error(id);
  i = id.end;

  const operator = consume(data, i, TokenType.Punctuator, '=');
  if (isAbrupt(operator)) return error(operator);
  i = operator.end;

  const init = parseExpression(data, i);
  if (isAbrupt(init)) return error(init);
  i = init.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (isAbrupt(terminator)) return error(terminator);

  return VariableDeclaration(kind.start, terminator.end, kind.value, id, init);
};
