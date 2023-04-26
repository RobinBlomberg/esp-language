import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
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
  if (abrupt(expression)) return expression;
  i = expression.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (abrupt(terminator)) return error(terminator);

  return ExpressionStatement(expression.start, terminator.end, expression);
};
