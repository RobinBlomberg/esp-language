import { ArrayLiteral } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
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
 *   [ Elision(opt) ]
 *   [ ElementList , Elision(opt) ]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ArrayLiteral
 */
export const parseArrayLiteral: Parser<ArrayLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '[');
  if (open) i = open.end;
  else return null;

  const elements = parseValueList(data, i);
  if (elements) i = elements.end;
  else return null;

  const close = consume(data, i, TokenType.Punctuator, ']');
  if (!close) return null;

  return ArrayLiteral(open.start, close.end, elements.values);
};
