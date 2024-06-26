import { ExpressionStatement } from '../../grammar';
import { consume, error, Parser, TokenType } from '../../lexer';
import { parseExpression } from './expression';

export const parseExpressionStatement: Parser<ExpressionStatement> = (
  data,
  i,
) => {
  const expression = parseExpression(data, i);
  if (expression.abrupt) return expression;
  i = expression.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);

  return ExpressionStatement(expression.start, terminator.end, expression);
};
