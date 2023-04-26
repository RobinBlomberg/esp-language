import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error, unused } from '../../esp-lexer/abrupt';
import { ArrayLiteral } from '../ast';
import { parseValueList } from './value-list';

/**
 * Adapted from ECMA-262:
 * ```ecmarkup
 * ArrayLiteral :
 *   [ ValueList ]
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * ArrayLiteral
 *   [ Elision<opt> ]
 *   [ ElementList , Elision<opt> ]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ArrayLiteral
 */
export const parseArrayLiteral: Parser<ArrayLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '[');
  if (abrupt(open)) return unused(open);
  i = open.end;

  const elements = parseValueList(data, i);
  if (abrupt(elements)) return error(elements);
  i = elements.end;

  const close = consume(data, i, TokenType.Punctuator, ']');
  if (abrupt(close)) return error(close);

  return ArrayLiteral(open.start, close.end, elements.values);
};
