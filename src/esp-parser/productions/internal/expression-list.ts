import {
  Abrupt,
  consume,
  Error,
  error,
  PunctuatorToken,
  TokenType,
  Unused,
} from '../../../esp-lexer';
import { IR } from '../../../ir';
import { parseExpression } from '../expression';

export const parseExpressionList = (
  data: string,
  i: number,
):
  | { abrupt?: never; start: number; end: number; values: IR.Expression[] }
  | Error => {
  const values: IR.Expression[] = [];

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
