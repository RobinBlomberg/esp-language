import { ArrayLiteral, Expression } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parsePrimaryExpression } from './primary-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ArrayLiteral[Yield, Await] :
 *   [ ElementList[?Yield, ?Await] ]
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * ArrayLiteral[Yield, Await] :
 *   [ Elisionopt ]
 *   [ ElementList[?Yield, ?Await] , Elisionopt ]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ArrayLiteral
 */
export const parseArrayLiteral: Parser<ArrayLiteral> = (data, start) => {
  let i = start;

  const open = consume(data, i, TokenType.Punctuator, '[');
  if (open) i = open.end;
  else return null;

  const elements: Expression[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, ']');
    if (close) {
      return ArrayLiteral(open.start, close.end, elements);
    }

    if (elements.length >= 1) {
      const comma = consume(data, i, TokenType.Punctuator, ',');
      if (comma) i = comma.end;
      else return null;
    }

    const element = parsePrimaryExpression(data, i);
    if (element) i = element.end;
    else return null;

    elements.push(element);
  }
};
