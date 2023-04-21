import { TokenType, consume } from '../../esp-lexer';
import { parseValueList } from './value-list';

/**
 * Returns:
 *  - `{ arguments, end }` if it parses without error
 *  - `null` if it parses with an error
 *  - `undefined` if the production is unused
 *
 * Modified from ECMA-262:
 * ```ecmarkup
 * Arguments :
 *   ( )
 *   ( ValueList )
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Arguments
 */
export const parseArguments = (data: string, i: number) => {
  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open) i = open.end;
  else return undefined;

  const arguments_ = parseValueList(data, i);
  if (arguments_) i = arguments_.end;
  else return null;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (!close) return null;

  return { end: close.end, arguments: arguments_.values };
};
