import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { VariableDeclaration } from '../ast';
import { parseExpression } from './expression';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * VariableDeclaration :
 *   let Identifier = Expression ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-VariableDeclaration
 */
export const parseVariableDeclaration: Parser<VariableDeclaration> = (
  data,
  i,
) => {
  const let_ = consume(data, i, TokenType.Keyword, 'let');
  if (abrupt(let_)) return let_;
  i = let_.end;

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

  return VariableDeclaration(let_.start, terminator.end, id.value, init);
};
