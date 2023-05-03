import { Identifier, NonAbrupt } from '../../../grammar';
import {
  Abrupt,
  PunctuatorToken,
  TokenType,
  Unused,
  consume,
  error,
  unused,
} from '../../../lexer';
import { parseIdentifier } from '../identifier';

export const parseParameterList = (
  data: string,
  i: number,
): NonAbrupt<{ end: number; parameters: Identifier[] }> | Abrupt => {
  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open.abrupt) return unused(open);
  i = open.end;

  const parameters: Identifier[] = [];

  while (true) {
    let comma: PunctuatorToken<','> | Abrupt = Unused(i);

    if (parameters.length >= 1) {
      comma = consume(data, i, TokenType.Punctuator, ',');
      if (comma.abrupt) break;
      else i = comma.end;
    }

    const value = parseIdentifier(data, i);
    if (!value.abrupt) i = value.end;
    else if (comma.abrupt) break;
    else return error(value);

    parameters.push(value);
  }

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (close.abrupt) return error(close);

  return { end: close.end, parameters };
};
