import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
import { error, unused } from '../../esp-lexer/abrupt';
import { ArrayLiteral } from '../ast';
import { parseExpressionList } from './internal/expression-list';

export const parseArrayLiteral: Parser<ArrayLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '[');
  if (isAbrupt(open)) return unused(open);
  i = open.end;

  const elements = parseExpressionList(data, i);
  if (isAbrupt(elements)) return error(elements);
  i = elements.end;

  const close = consume(data, i, TokenType.Punctuator, ']');
  if (isAbrupt(close)) return error(close);

  return ArrayLiteral(open.start, close.end, elements.values);
};
