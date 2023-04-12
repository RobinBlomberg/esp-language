import {
  ComputedMemberExpression,
  Expression,
  NewExpression,
  StaticMemberExpression,
} from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseArguments } from './arguments';
import { parseExpression } from './expression';
import { parseIdentifierName } from './identifier-name';
import { parsePrimaryExpression } from './primary-expression';

/**
 * Supported from ECMA-262:
 *
 * ```ecmarkup
 * MemberExpression :
 *   PrimaryExpression
 *   MemberExpression [ Expression ]
 *   MemberExpression . IdentifierName
 *   new MemberExpression Arguments
 * ```
 *
 * Not supported from ECMA-262:
 * ```ecmarkup
 * MemberExpression :
 *   MemberExpression TemplateLiteral
 *   SuperProperty
 *   MetaProperty
 *   MemberExpression . PrivateIdentifier
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-MemberExpression
 */
export const parseMemberExpression: Parser<Expression> = (data, i) => {
  const newKeyword = consume(data, i, TokenType.Name, 'new');
  if (newKeyword) {
    i = newKeyword.end;

    const callee = parseMemberExpression(data, i);
    if (callee) i = callee.end;
    else return null;

    const args = parseArguments(data, i);
    if (!args) return null;

    return NewExpression(newKeyword.start, args.end, callee, args.arguments);
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
