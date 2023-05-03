import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { parseExpression } from './expression';
import { parseIdentifierName } from './identifier-name';

export const parseObjectLiteral: Parser<IR.ObjectLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (open.abrupt) return open;
  i = open.end;

  const properties: IR.Property[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (!close.abrupt) {
      return IR.ObjectLiteral(open.start, close.end, properties);
    }

    if (properties.length >= 1) {
      const comma = consume(data, i, TokenType.Punctuator, ',');
      if (comma.abrupt) return error(comma);
      i = comma.end;
    }

    const key = parseIdentifierName(data, i);
    if (key.abrupt) return error(key);
    i = key.end;

    const colon = consume(data, i, TokenType.Punctuator, ':');
    if (colon.abrupt) return error(colon);
    i = colon.end;

    const value = parseExpression(data, i);
    if (value.abrupt) return error(value);
    i = value.end;

    properties.push(IR.Property(key.start, value.end, key, value));
  }
};
