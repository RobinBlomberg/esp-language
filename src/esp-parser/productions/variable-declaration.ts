import {
  Parser,
  TokenType,
  abrupt,
  consume,
  consumeToken,
} from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { VariableDeclaration } from '../ast';
import { VariableKindTokenMatcher } from '../token-matchers';
import { parseExpression } from './expression';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * VariableDeclaration :
 *   LetOrConst Identifier = Expression ;
 *
 * LetOrConst :
 *   let
 *   const
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-VariableDeclaration
 */
export const parseVariableDeclaration: Parser<VariableDeclaration> = (
  data,
  i,
) => {
  const kind = consumeToken(data, i, VariableKindTokenMatcher);
  if (abrupt(kind)) return kind;
  i = kind.end;

  const id = consume(data, i, TokenType.Identifier);
  if (abrupt(id)) return error(id);
  i = id.end;

  const operator = consume(data, i, TokenType.Punctuator, '=');
  if (abrupt(operator)) return error(operator);
  i = operator.end;

  const init = parseExpression(data, i);
  if (abrupt(init)) return error(init);
  i = init.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);

  return VariableDeclaration(
    kind.start,
    terminator.end,
    kind.value,
    id.value,
    init,
  );
};
