import { Parser, TokenType, consume } from '../../lexer';
import { UnionClause } from '../ast';
import { parseValueList } from './value-list';

/**
 * ```ecmarkup
 * UnionClause :
 *   { ValueList }
 * ```
 */
export const parseUnionClause: Parser<UnionClause> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (open) i = open.end;
  else return null;

  const values = parseValueList(data, i);
  if (values) i = values.end;
  else return null;

  const close = consume(data, i, TokenType.Punctuator, '}');
  if (!close) return null;

  return UnionClause(open.start, close.end, values.values);
};
