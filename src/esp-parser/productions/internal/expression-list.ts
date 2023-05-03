import { Expression, NonAbrupt } from '../../../esp-grammar/ast';
import {
  Abrupt,
  consume,
  Error,
  error,
  PunctuatorToken,
  TokenType,
  Unused,
} from '../../../esp-lexer';
import { parseExpression } from '../expression';

export const parseExpressionList = (
  data: string,
  i: number,
): NonAbrupt<{ start: number; end: number; values: Expression[] }> | Error => {
  const values: Expression[] = [];

  while (true) {
    let comma: PunctuatorToken<','> | Abrupt = Unused(i);

    if (values.length >= 1) {
      comma = consume(data, i, TokenType.Punctuator, ',');
      if (comma.abrupt) break;
      else i = comma.end;
    }

    const value = parseExpression(data, i);
    if (!value.abrupt) i = value.end;
    else if (comma.abrupt) break;
    else return error(value);

    values.push(value);
  }

  return { start: values[0]?.start ?? i, end: i, values };
};
