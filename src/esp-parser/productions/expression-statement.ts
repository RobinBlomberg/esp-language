import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ExpressionStatement } from '../ast';
import { parseExpression } from './expression';

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
