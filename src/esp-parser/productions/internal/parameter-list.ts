import {
  Abrupt,
  consume,
  error,
  PunctuatorToken,
  TokenType,
  Unused,
  unused,
} from '../../../esp-lexer';
import { IR } from '../../../ir-ast';
import { parseIdentifier } from '../identifier';

export const parseParameterList = (
  data: string,
  i: number,
): { abrupt?: never; end: number; parameters: IR.Identifier[] } | Abrupt => {
  const open = consume(data, i, TokenType.Punctuator, '(');
  if (open.abrupt) return unused(open);
  i = open.end;

  const parameters: IR.Identifier[] = [];

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
