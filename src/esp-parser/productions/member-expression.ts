import { Keyword } from '../../esp-grammar';
import { Parser, TokenType, consume, isAbrupt } from '../../esp-lexer';
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

export const parseMemberExpression: Parser<Expression> = (data, i) => {
  const new_ = consume(data, i, TokenType.Keyword, Keyword.New);
  if (!isAbrupt(new_)) {
    i = new_.end;

    const callee = parseMemberExpression(data, i);
    if (isAbrupt(callee)) return error(callee);
    i = callee.end;

    const args = parseArguments(data, i);
    if (isAbrupt(args)) return error(args);

    return NewExpression(new_.start, args.end, callee, args.arguments);
  }

  let object = parsePrimaryExpression(data, i);
  if (isAbrupt(object)) return object;
  i = object.end;

  while (true) {
    const dot = consume(data, i, TokenType.Punctuator, '.');
    if (!isAbrupt(dot)) {
      i = dot.end;

      const property = parseIdentifierName(data, i);
      if (isAbrupt(property)) return error(property);
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
    if (isAbrupt(open)) break;
    i = open.end;

    const property = parseExpression(data, i);
    if (isAbrupt(property)) return error(property);
    i = property.end;

    const close = consume(data, i, TokenType.Punctuator, ']');
    if (isAbrupt(close)) return error(close);
    i = close.end;

    object = ComputedMemberExpression(object.start, i, object, property);
    continue;
  }

  return object;
};
