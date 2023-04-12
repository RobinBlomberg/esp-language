import { Arguments, Expression } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseExpression } from './expression';

/**
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
export const parseArguments: Parser<Arguments> = (data, start) => {
  let i = start;

  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open) i = open.end;
  else return null;

  const arguments_: Expression[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, ')');
    if (close) {
      return Arguments(open.start, close.end, arguments_);
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
