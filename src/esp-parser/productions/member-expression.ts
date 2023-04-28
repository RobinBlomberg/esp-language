import { Parser, TokenType, abrupt, consume } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import {
  ComputedMemberExpression,
  Expression,
  NewExpression,
  StaticMemberExpression,
} from '../ast';
import { parseExpression } from './expression';
import { parseIdentifierName } from './identifier-name';
import { parseArguments } from './internal/arguments';
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
  const new_ = consume(data, i, TokenType.Keyword, 'new');
  if (!abrupt(new_)) {
    i = new_.end;

    const callee = parseMemberExpression(data, i);
    if (abrupt(callee)) return error(callee);
    i = callee.end;

    const args = parseArguments(data, i);
    if (abrupt(args)) return error(args);

    return NewExpression(new_.start, args.end, callee, args.arguments);
  }

  let object = parsePrimaryExpression(data, i);
  if (abrupt(object)) return object;
  i = object.end;

  while (true) {
    const dot = consume(data, i, TokenType.Punctuator, '.');
    if (!abrupt(dot)) {
      i = dot.end;

      const property = parseIdentifierName(data, i);
      if (abrupt(property)) return error(property);
      i = property.end;

      object = StaticMemberExpression(
        object.start,
        property.end,
        object,
        property,
      );
      continue;
    }

    const open = consume(data, i, TokenType.Punctuator, '[');
    if (abrupt(open)) break;
    i = open.end;

    const property = parseExpression(data, i);
    if (abrupt(property)) return error(property);
    i = property.end;

    const close = consume(data, i, TokenType.Punctuator, ']');
    if (abrupt(close)) return error(close);
    i = close.end;

    object = ComputedMemberExpression(object.start, i, object, property);
    continue;
  }

  return object;
};
