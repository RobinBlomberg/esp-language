import * as ast from '../node-factory';
import { ArrayLiteral, Expression } from '../nodes';
import { consume } from '../parse-utils';
import { TokenType as tt } from '../token-type';
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
export const parseArrayLiteral = (
  data: string,
  start: number,
): ArrayLiteral | null => {
  let i = start;

  const open = consume(data, i, tt.Punctuator, '[');
  if (open) i = open.end;
  else return null;

  const elements: Expression[] = [];

  while (true) {
    const close = consume(data, i, tt.Punctuator, ']');
    if (close) {
      return ast.arrayLiteral(open.start, close.end, elements);
    }

    if (elements.length >= 1) {
      const comma = consume(data, i, tt.Punctuator, ',');
      if (comma) i = comma.end;
      else return null;
    }

    const element = parsePrimaryExpression(data, i);
    if (element) i = element.end;
    else return null;

    elements.push(element);
  }
};
