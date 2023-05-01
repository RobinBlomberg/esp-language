import { TokenType, consume, isAbrupt } from '../../../esp-lexer';
import { Error, Unused, error } from '../../../esp-lexer/abrupt';
import { PunctuatorToken } from '../../../esp-lexer/token';
import { Expression } from '../../ast';
import { parseExpression } from '../expression';

export const parseExpressionList = (data: string, i: number) => {
  const values: Expression[] = [];

  while (true) {
    let comma: PunctuatorToken<','> | Error | Unused = Unused(i);

    if (values.length >= 1) {
      comma = consume(data, i, TokenType.Punctuator, ',');
      if (isAbrupt(comma)) break;
      else i = comma.end;
    }

    const value = parseExpression(data, i);
    if (!isAbrupt(value)) i = value.end;
    else if (isAbrupt(comma)) break;
    else return error(value);

    values.push(value);
  }

  return { start: values[0]?.start ?? i, end: i, values };
};
