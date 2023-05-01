import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { SetLiteral } from '../ast';
import { parseExpressionList } from './internal/expression-list';

export const parseSetLiteral: Parser<SetLiteral> = (data, i) => {
  const openCurly = consume(data, i, TokenType.Punctuator, '{');
  if (abrupt(openCurly)) return openCurly;
  i = openCurly.end;

  const openBracket = consume(data, i, TokenType.Punctuator, '[');
  if (abrupt(openBracket)) return error(openBracket);
  i = openBracket.end;

  const values = parseExpressionList(data, i);
  if (abrupt(values)) return error(values);
  i = values.end;

  const closeBracket = consume(data, i, TokenType.Punctuator, ']');
  if (abrupt(closeBracket)) return error(closeBracket);
  i = closeBracket.end;

  const closeCurly = consume(data, i, TokenType.Punctuator, '}');
  if (abrupt(closeCurly)) return error(closeCurly);

  return SetLiteral(openCurly.start, closeCurly.end, values.values);
};
