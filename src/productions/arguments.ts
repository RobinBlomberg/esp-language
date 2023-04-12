import { Expression } from '../ast';
import { TokenType } from '../token-type';
import { consume } from '../token-utils';
import { parseExpression } from './expression';

/**
 * Returns:
 *  - `{ arguments, end }` if it parses without error
 *  - `null` if it parses with an error
 *  - `undefined` if the production is unused
 *
 * Supported from ECMA-262:
 * ```ecmarkup
 * Arguments :
 *   ( )
 *   ( ArgumentList )
 *   ( ArgumentList , )
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Arguments
 */
export const parseArguments = (data: string, i: number) => {
  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open) i = open.end;
  else return undefined;

  const arguments_: Expression[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, ')');
    if (close) {
      return { arguments: arguments_, end: close.end };
    }

    if (arguments_.length >= 1) {
      const comma = consume(data, i, TokenType.Punctuator, ',');
      if (comma) i = comma.end;
      else return null;
    }

    const element = parseExpression(data, i);
    if (element) i = element.end;
    else return null;

    arguments_.push(element);
  }
};
