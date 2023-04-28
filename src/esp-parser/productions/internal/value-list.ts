import { TokenType, abrupt, consume } from '../../../esp-lexer';
import { Error, Unused, error } from '../../../esp-lexer/abrupt';
import { PunctuatorToken } from '../../../esp-lexer/token';
import { Expression } from '../../ast';
import { parseExpression } from '../expression';

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
    let comma: PunctuatorToken<','> | Error | Unused = Unused(i);

    if (values.length >= 1) {
      comma = consume(data, i, TokenType.Punctuator, ',');
      if (abrupt(comma)) break;
      else i = comma.end;
    }

    const value = parseExpression(data, i);
    if (!abrupt(value)) i = value.end;
    else if (abrupt(comma)) break;
    else return error(value);

    values.push(value);
  }

  return { end: i, values };
};
