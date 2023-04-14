import { SetLiteral } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseValueList } from './value-list';

/**
 * ```ecmarkup
 * SetLiteral :
 *   # { ValueList }
 * ```
 */
export const parseSetLiteral: Parser<SetLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '#');
  if (open) i = open.end;
  else return null;

  const openParen = consume(data, i, TokenType.Punctuator, '{');
  if (openParen) i = openParen.end;
  else return null;

  const values = parseValueList(data, i);
  if (values) i = values.end;
  else return null;

  const closeParen = consume(data, i, TokenType.Punctuator, '}');
  if (!closeParen) return null;

  return SetLiteral(open.start, closeParen.end, values.values);
};
