import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ObjectLiteral, Property } from '../ast';
import { parseExpression } from './expression';
import { parseIdentifierName } from './identifier-name';

export const parseObjectLiteral: Parser<ObjectLiteral> = (data, i) => {
  const open = consume(data, i, TokenType.Punctuator, '{');
  if (abrupt(open)) return open;
  i = open.end;

  const properties: Property[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (!abrupt(close)) {
      return ObjectLiteral(open.start, close.end, properties);
    }

    if (properties.length >= 1) {
      const comma = consume(data, i, TokenType.Punctuator, ',');
      if (abrupt(comma)) return error(comma);
      i = comma.end;
    }

    const key = parseIdentifierName(data, i);
    if (abrupt(key)) return error(key);
    i = key.end;

    const colon = consume(data, i, TokenType.Punctuator, ':');
    if (abrupt(colon)) return error(colon);
    i = colon.end;

    const value = parseExpression(data, i);
    if (abrupt(value)) return error(value);
    i = value.end;

    properties.push(Property(key.start, value.end, key, value));
  }
};
