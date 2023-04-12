import { ObjectLiteral, Property } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseIdentifierName } from './identifier-name';
import { parsePrimaryExpression } from './primary-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ObjectLiteral :
 *   { }
 *   { PropertyDefinitionList }
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * ObjectLiteral :
 *   { PropertyDefinitionList , }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ObjectLiteral
 */
export const parseObjectLiteral: Parser<ObjectLiteral> = (data, start) => {
  let i = start;

  const open = consume(data, i, TokenType.Punctuator, '{');
  if (open) i = open.end;
  else return null;

  const properties: Property[] = [];

  while (true) {
    const close = consume(data, i, TokenType.Punctuator, '}');
    if (close) {
      return ObjectLiteral(open.start, close.end, properties);
    }

    if (properties.length >= 1) {
      const comma = consume(data, i, TokenType.Punctuator, ',');
      if (comma) i = comma.end;
      else return null;
    }

    const key = parseIdentifierName(data, i);
    if (key) i = key.end;
    else return null;

    const colon = consume(data, i, TokenType.Punctuator, ':');
    if (colon) i = colon.end;
    else return null;

    const value = parsePrimaryExpression(data, i);
    if (value) i = value.end;
    else return null;

    properties.push(Property(key.start, value.end, key, value));
  }
};
