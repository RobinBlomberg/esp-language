import { ObjectLiteral, Property } from '../ast';
import { Parser, consume } from '../parser-utils';
import { TokenType as tt } from '../token-type';
import { parseIdentifierName } from './identifier-name';
import { parsePrimaryExpression } from './primary-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * ObjectLiteral[Yield, Await] :
 *   { }
 *   { PropertyDefinitionList[?Yield, ?Await] }
 *   { PropertyDefinitionList[?Yield, ?Await] , }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ObjectLiteral
 */
export const parseObjectLiteral: Parser<ObjectLiteral> = (data, start) => {
  let i = start;

  const open = consume(data, i, tt.Punctuator, '{');
  if (open) i = open.end;
  else return null;

  const properties: Property[] = [];

  while (true) {
    const close = consume(data, i, tt.Punctuator, '}');
    if (close) {
      return ObjectLiteral(open.start, close.end, properties);
    }

    if (properties.length >= 1) {
      const comma = consume(data, i, tt.Punctuator, ',');
      if (comma) i = comma.end;
      else return null;
    }

    const key = parseIdentifierName(data, i);
    if (key) i = key.end;
    else return null;

    const colon = consume(data, i, tt.Punctuator, ':');
    if (colon) i = colon.end;
    else return null;

    const value = parsePrimaryExpression(data, i);
    if (value) i = value.end;
    else return null;

    properties.push(Property(key.start, value.end, key, value));
  }
};
