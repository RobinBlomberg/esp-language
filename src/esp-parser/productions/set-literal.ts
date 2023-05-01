import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { SetLiteral } from '../ast';
import { parseExpressionList } from './internal/expression-list';

/**
 * ```ecmarkup
 * SetLiteral :
 *   # { ValueList }
 * ```
 */
export const parseSetLiteral: Parser<SetLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '#');
  if (abrupt(open)) return open;
  i = open.end;

  const openParen = consume(data, i, TokenType.Punctuator, '{');
  if (abrupt(openParen)) return error(openParen);
  i = openParen.end;

  const values = parseExpressionList(data, i);
  if (abrupt(values)) return error(values);
  i = values.end;

  const closeParen = consume(data, i, TokenType.Punctuator, '}');
  if (abrupt(closeParen)) return error(closeParen);

  return SetLiteral(open.start, closeParen.end, values.values);
};
