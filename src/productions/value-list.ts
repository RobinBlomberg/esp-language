import { Expression } from '../ast';
import { Token } from '../token';
import { TokenType } from '../token-type';
import { consume } from '../token-utils';
import { parseExpression } from './expression';

/**
 * ```ecmarkup
 * ValueList :
 *   Value
 *   ValueList , Value
 * ```
 */
export const parseValueList = (data: string, i: number) => {
  const values: Expression[] = [];

  while (true) {
    let comma: Token<TokenType.Punctuator, ','> | null = null;

    if (values.length >= 1) {
      comma = consume(data, i, TokenType.Punctuator, ',');
      if (comma) i = comma.end;
      else break;
    }

    const value = parseExpression(data, i);
    if (value) i = value.end;
    else if (comma) return null;
    else break;

    values.push(value);
  }

  return { end: i, values };
};
