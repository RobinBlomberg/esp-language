import {
  CallExpression,
  ComputedMemberExpression,
  ControlKeyword,
  Expression,
  Keyword,
  NewExpression,
  StaticMemberExpression,
} from '../../grammar';
import {
  Error,
  KeywordToken,
  Parser,
  TokenType,
  consume,
  consumeToken,
  error,
} from '../../lexer';
import { MemberExpressionOpenTokenMatcher } from '../token-matchers';
import { parseExpression } from './expression';
import { parseIdentifierName } from './identifier-name';
import { parseArguments } from './internal/arguments';
import { parsePrimaryExpression } from './primary-expression';

export const parseLeftHandSideExpression: Parser<Expression> = (data, i) => {
  const newKeywords: KeywordToken<ControlKeyword.New>[] = [];

  while (true) {
    const new_ = consume(data, i, TokenType.Keyword, Keyword.New);
    if (new_.abrupt) break;
    i = new_.end;
    newKeywords.push(new_);
  }

  let object = parsePrimaryExpression(data, i);
  if (object.abrupt) return newKeywords.length ? error(object) : object;
  i = object.end;

  while (true) {
    const open = consumeToken(data, i, MemberExpressionOpenTokenMatcher);
    if (open.abrupt) break;
    i = open.end;

    if (open.value === '.') {
      const property = parseIdentifierName(data, i);
      if (property.abrupt) return error(property);
      i = property.end;

      object = StaticMemberExpression(
        object.start,
        property.end,
        object,
        property,
      );
    } else if (open.value === '[') {
      const property = parseExpression(data, i);
      if (property.abrupt) return error(property);
      i = property.end;

      const close = consume(data, i, TokenType.Punctuator, ']');
      if (close.abrupt) return error(close);
      i = close.end;
      object = ComputedMemberExpression(object.start, i, object, property);
    } else {
      const args = parseArguments(data, object.end);
      if (args.abrupt) return error(object);
      i = args.end;

      const newKeyword = newKeywords.pop();
      if (newKeyword) {
        object = NewExpression(
          newKeyword.start,
          args.end,
          object,
          args.arguments,
        );
      } else {
        object = CallExpression(object.start, args.end, object, args.arguments);
      }
    }
  }

  if (newKeywords.length) return Error(i, i);

  return object;
};
