import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir';
import { parseExpression } from './expression';

export const parseExpressionStatement: Parser<IR.ExpressionStatement> = (
  data,
  i,
) => {
  const expression = parseExpression(data, i);
  if (expression.abrupt) return expression;
  i = expression.end;

  const terminator = consume(data, i, TokenType.Punctuator, ';');
  if (terminator.abrupt) return error(terminator);

  return IR.ExpressionStatement(expression.start, terminator.end, expression);
};
