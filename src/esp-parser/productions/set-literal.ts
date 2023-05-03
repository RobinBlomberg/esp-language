import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { parseExpressionList } from './internal/expression-list';

export const parseSetLiteral: Parser<IR.SetLiteral> = (data, i) => {
  const openCurly = consume(data, i, TokenType.Punctuator, '{');
  if (openCurly.abrupt) return openCurly;
  i = openCurly.end;

  const openBracket = consume(data, i, TokenType.Punctuator, '[');
  if (openBracket.abrupt) return error(openBracket);
  i = openBracket.end;

  const values = parseExpressionList(data, i);
  if (values.abrupt) return error(values);
  i = values.end;

  const closeBracket = consume(data, i, TokenType.Punctuator, ']');
  if (closeBracket.abrupt) return error(closeBracket);
  i = closeBracket.end;

  const closeCurly = consume(data, i, TokenType.Punctuator, '}');
  if (closeCurly.abrupt) return error(closeCurly);

  return IR.SetLiteral(openCurly.start, closeCurly.end, values.values);
};
