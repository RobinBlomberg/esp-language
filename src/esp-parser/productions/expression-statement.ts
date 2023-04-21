import { Parser, TokenType, consume } from '../../esp-lexer';
import { ExpressionStatement } from '../ast';
import { parseExpression } from './expression';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * ExpressionStatement :
 *   Expression ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ExpressionStatement
 */
export const parseExpressionStatement: Parser<ExpressionStatement> = (
  data,
  i,
) => {
  const expression = parseExpression(data, i);
  if (expression) i = expression.end;
  else return null;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (!terminator) return null;

  return ExpressionStatement(expression.start, terminator.end, expression);
};
