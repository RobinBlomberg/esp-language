import {
  ComputedMemberExpression,
  Expression,
  NewExpression,
  StaticMemberExpression,
} from '../ast';
import { Parser, consume } from '../parser-utils';
import { TokenType } from '../token-type';
import { parseArguments } from './arguments';
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
export const parseMemberExpression: Parser<Expression> = (data, start) => {
  let i = start;

  const newKeyword = consume(data, i, TokenType.Name, 'new');
  if (newKeyword) {
    i = newKeyword.end;

    const callee = parseMemberExpression(data, i);
    if (callee) i = callee.end;
    else return null;

    const arguments_ = parseArguments(data, i);
    if (arguments_) i = arguments_.end;
    else return null;

    return NewExpression(newKeyword.start, arguments_.end, callee, arguments_);
  }

  let object = parsePrimaryExpression(data, i);
  if (object) i = object.end;
  else return null;

  while (true) {
    const dot = consume(data, i, TokenType.Punctuator, '.');
    if (dot) {
      i = dot.end;

      const property = parseIdentifierName(data, i);
      if (property) i = property.end;
      else return null;

      object = StaticMemberExpression(
        object.start,
        property.end,
        object,
        property,
      );
      continue;
    }

    const open = consume(data, i, TokenType.Punctuator, '[');
    if (open) {
      i = open.end;

      const property = parseExpression(data, i);
      if (property) i = property.end;
      else return null;

      const close = consume(data, i, TokenType.Punctuator, ']');
      if (close) i = close.end;
      else return null;

      object = ComputedMemberExpression(object.start, i, object, property);
      continue;
    }

    break;
  }

  return object;
};
