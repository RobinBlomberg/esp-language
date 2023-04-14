import { Parser, TokenType, consume } from '../../lexer';
import { ConditionalExpression, Expression } from '../ast';
import { parseExpression } from './expression';
import { parseLogicalORExpression } from './logical-or-expression';

/**
 * Modified from ECMA-262:
 * ```ecmarkup
 * ConditionalExpression :
 *   LogicalORExpression
 *   LogicalORExpression ? Expression : Expression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ConditionalExpression
 */
export const parseConditionalExpression: Parser<Expression> = (data, i) => {
  const test = parseLogicalORExpression(data, i);
  if (test) i = test.end;
  else return null;

  const consequentOperator = consume(data, i, TokenType.Punctuator, '?');
  if (consequentOperator) i = consequentOperator.end;
  else return test;

  const consequent = parseExpression(data, i);
  if (consequent) i = consequent.end;
  else return null;

  const alternateOperator = consume(data, i, TokenType.Punctuator, ':');
  if (alternateOperator) i = alternateOperator.end;
  else return null;

  const alternate = parseExpression(data, i);
  if (!alternate) return null;

  return ConditionalExpression(
    test.start,
    alternate.end,
    test,
    consequent,
    alternate,
  );
};
