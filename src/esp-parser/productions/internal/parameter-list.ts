import { TokenType, abrupt, consume } from '../../../esp-lexer';
import { Error, Unused, error, unused } from '../../../esp-lexer/abrupt';
import { PunctuatorToken } from '../../../esp-lexer/token';
import { Identifier } from '../../ast';
import { parseIdentifier } from '../identifier';

export const parseParameterList = (data: string, i: number) => {
  const open = consume(data, i, TokenType.Punctuator, '(');
  if (abrupt(open)) return unused(open);
  i = open.end;

  const parameters: Identifier[] = [];

  while (true) {
    let comma: PunctuatorToken<','> | Error | Unused = Unused(i);

    if (parameters.length >= 1) {
      comma = consume(data, i, TokenType.Punctuator, ',');
      if (abrupt(comma)) break;
      else i = comma.end;
    }

    const value = parseIdentifier(data, i);
    if (!abrupt(value)) i = value.end;
    else if (abrupt(comma)) break;
    else return error(value);

    parameters.push(value);
  }

  const close = consume(data, i, TokenType.Punctuator, ')');
  if (abrupt(close)) return error(close);

  return { end: close.end, parameters };
};
