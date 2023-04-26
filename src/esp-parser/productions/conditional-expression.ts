import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
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
  if (abrupt(test)) return test;
  i = test.end;

  const consequentOperator = consume(data, i, TokenType.Punctuator, '?');
  if (abrupt(consequentOperator)) return test;
  i = consequentOperator.end;

  const consequent = parseExpression(data, i);
  if (abrupt(consequent)) return error(consequent);
  i = consequent.end;

  const alternateOperator = consume(data, i, TokenType.Punctuator, ':');
  if (abrupt(alternateOperator)) return error(alternateOperator);
  i = alternateOperator.end;

  const alternate = parseExpression(data, i);
  if (abrupt(alternate)) return error(alternate);

  return ConditionalExpression(
    test.start,
    alternate.end,
    test,
    consequent,
    alternate,
  );
};
