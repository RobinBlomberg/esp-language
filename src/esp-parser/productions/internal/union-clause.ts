import { Parser, TokenType, abrupt, consume } from '../../../esp-lexer';
import { error } from '../../../esp-lexer/abrupt';
import { UnionClause } from '../../ast';
import { parseValueList } from './value-list';

/**
 * ```ecmarkup
 * UnionClause :
 *   { ValueList }
 * ```
 */
export const parseUnionClause: Parser<UnionClause> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (abrupt(open)) return open;
  i = open.end;

  const values = parseValueList(data, i);
  if (abrupt(values)) return error(values);
  i = values.end;

  const close = consume(data, i, TokenType.Punctuator, '}');
  if (abrupt(close)) return error(close);

  return UnionClause(open.start, close.end, values.values);
};
