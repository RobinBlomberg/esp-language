import { VariableDeclaration } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
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
  const letKeyword = consume(data, i, TokenType.Keyword, 'let');
  if (letKeyword) i = letKeyword.end;
  else return null;

  const id = consume(data, i, TokenType.Identifier);
  if (id) i = id.end;
  else return null;

  const operator = consume(data, i, TokenType.Punctuator, '=');
  if (operator) i = operator.end;
  else return null;

  const init = parseExpression(data, i);
  if (init) i = init.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (!terminator) return null;

  return VariableDeclaration(letKeyword.start, terminator.end, id.value, init);
};
