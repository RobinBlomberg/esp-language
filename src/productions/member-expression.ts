import * as ast from '../node-factory';
import { Expression } from '../nodes';
import { consume } from '../parse-utils';
import { TokenType as tt } from '../token-type';
import { parseExpression } from './expression';
import { parseIdentifierName } from './identifier-name';
import { parsePrimaryExpression } from './primary-expression';

/**
 * Supported from ECMA-262:
 *
 * ```ecmarkup
 * MemberExpression[Yield, Await] :
 *   PrimaryExpression[?Yield, ?Await]
 *   MemberExpression[?Yield, ?Await] [ Expression[+In, ?Yield, ?Await] ]
 *   MemberExpression[?Yield, ?Await] . IdentifierName
 *   new MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * MemberExpression[Yield, Await] :
 *   MemberExpression[?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]
 *   SuperProperty[?Yield, ?Await]
 *   MetaProperty
 *   MemberExpression[?Yield, ?Await] . PrivateIdentifier
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-MemberExpression
 */
export const parseMemberExpression = (
  data: string,
  start: number,
): Expression | null => {
  let i = start;

  const newKeyword = consume(data, i, tt.Name, 'new');
  if (newKeyword) {
    i = newKeyword.end;

    const callee = parseMemberExpression(data, i);
    if (callee) i = callee.end;
    else return null;

    const open = consume(data, i, tt.Punctuator, '(');
    if (open) i = open.end;
    else return null;

    const arguments_: Expression[] = [];

    while (true) {
      const close = consume(data, i, tt.Punctuator, ')');
      if (close) {
        return ast.newExpression(
          newKeyword.start,
          close.end,
          callee,
          arguments_,
        );
      }

      if (arguments_.length >= 1) {
        const comma = consume(data, i, tt.Punctuator, ',');
        if (comma) i = comma.end;
        else return null;
      }

      const element = parsePrimaryExpression(data, i);
      if (element) i = element.end;
      else return null;

      arguments_.push(element);
    }
  }

  let object = parsePrimaryExpression(data, i);
  if (object) i = object.end;
  else return null;

  while (true) {
    const dot = consume(data, i, tt.Punctuator, '.');
    if (dot) {
      i = dot.end;

      const property = parseIdentifierName(data, i);
      if (property) i = property.end;
      else return null;

      object = ast.staticMemberExpression(
        object.start,
        property.end,
        object,
        property,
      );
      continue;
    }

    const open = consume(data, i, tt.Punctuator, '[');
    if (open) {
      i = open.end;

      const property = parseExpression(data, i);
      if (property) i = property.end;
      else return null;

      const close = consume(data, i, tt.Punctuator, ']');
      if (close) i = close.end;
      else return null;

      object = ast.computedMemberExpression(object.start, i, object, property);
      continue;
    }

    break;
  }

  return object;
};
