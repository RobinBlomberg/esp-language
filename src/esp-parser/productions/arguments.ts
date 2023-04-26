import { TokenType, abrupt, consume } from '../../esp-lexer';
import { error, unused } from '../../esp-lexer/abrupt';
import { parseValueList } from './value-list';

/**
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
  if (abrupt(open)) return unused(open);
  i = open.end;

  const arguments_ = parseValueList(data, i);
  if (abrupt(arguments_)) return error(arguments_);
  i = arguments_.end;

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (abrupt(close)) return error(close);

  return { end: close.end, arguments: arguments_.values };
};
