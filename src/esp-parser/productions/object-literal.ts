import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { ObjectLiteral, Property } from '../ast';
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

    const value = parsePrimaryExpression(data, i);
    if (abrupt(value)) return error(value);
    i = value.end;

    properties.push(Property(key.start, value.end, key, value));
  }
};
