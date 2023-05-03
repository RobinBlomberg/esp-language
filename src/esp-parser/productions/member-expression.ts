import { Keyword } from '../../esp-grammar';
import { consume, error, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';
import { parseExpression } from './expression';
import { parseIdentifierName } from './identifier-name';
import { parseArguments } from './internal/arguments';
import { parsePrimaryExpression } from './primary-expression';

export const parseMemberExpression: Parser<IR.Expression> = (data, i) => {
  const new_ = consume(data, i, TokenType.Keyword, Keyword.New);
  if (!new_.abrupt) {
    i = new_.end;

    const callee = parseMemberExpression(data, i);
    if (callee.abrupt) return error(callee);
    i = callee.end;

    const args = parseArguments(data, i);
    if (args.abrupt) return error(args);

    return IR.NewExpression(new_.start, args.end, callee, args.arguments);
  }

  let object = parsePrimaryExpression(data, i);
  if (object.abrupt) return object;
  i = object.end;

  while (true) {
    const dot = consume(data, i, TokenType.Punctuator, '.');
    if (!dot.abrupt) {
      i = dot.end;

      const property = parseIdentifierName(data, i);
      if (property.abrupt) return error(property);
      i = property.end;

      object = IR.MemberExpression(
        object.start,
        property.end,
        object,
        property,
        false,
      );
      continue;
    }

    const open = consume(data, i, TokenType.Punctuator, '[');
    if (open.abrupt) break;
    i = open.end;

    const property = parseExpression(data, i);
    if (property.abrupt) return error(property);
    i = property.end;

    const close = consume(data, i, TokenType.Punctuator, ']');
    if (close.abrupt) return error(close);
    i = close.end;

    object = IR.MemberExpression(object.start, i, object, property, true);
    continue;
  }

  return object;
};
