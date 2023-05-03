import { consume, error, Parser, TokenType, unused } from '../../esp-lexer';
import { IR } from '../../ir';
import { parseExpressionList } from './internal/expression-list';

export const parseArrayLiteral: Parser<IR.ArrayLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '[');
  if (open.abrupt) return unused(open);
  i = open.end;

  const elements = parseExpressionList(data, i);
  if (elements.abrupt) return error(elements);
  i = elements.end;

  const close = consume(data, i, TokenType.Punctuator, ']');
  if (close.abrupt) return error(close);

  return IR.ArrayLiteral(open.start, close.end, elements.values);
};
