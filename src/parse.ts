import { lex } from './lex';
import * as ast from './node-factory';
import {
  ArrayLiteralNode,
  IdentifierNode,
  LiteralNode,
  StaticMemberExpressionNode,
  ObjectLiteralNode,
  Expression,
  Property,
} from './nodes';
import { reservedWords } from './reserved-words';
import { Token } from './token';
import { TokenType as tt } from './token-type';

const consume = <T extends tt, V extends string = string>(
  data: string,
  start: number,
  type: T,
  value?: V,
): Token<T, V> | null => {
  const token = lex(data, start);
  return match(token, type, value) ? token : null;
};

const match = <T extends tt, V extends string = string>(
  token: Token | null,
  type: T,
  value?: V,
): token is Token<T, V> => {
  return (
    token !== null &&
    token.type === type &&
    (value === undefined || token.value === value)
  );
};

export const parseArrayLiteral = (
  data: string,
  start: number,
): ArrayLiteralNode | null => {
  let i = start;

  const open = consume(data, i, tt.Punctuator, '[');
  if (open) i = open.end;
  else return null;

  const elements: Expression[] = [];

  while (true) {
    const close = consume(data, i, tt.Punctuator, ']');
    if (close) {
      return ast.arrayLiteral(open.start, close.end, elements);
    }

    if (elements.length >= 1) {
      const comma = consume(data, i, tt.Punctuator, ',');
      if (comma) i = comma.end;
      else return null;
    }

    const element = parsePrimaryExpression(data, i);
    if (element) i = element.end;
    else return null;

    elements.push(element);
  }
};

export const parseExpression = (
  data: string,
  start: number,
): Expression | null => {
  return parseMemberExpression(data, start);
};

export const parseIdentifier = (
  data: string,
  start: number,
): IdentifierNode | null => {
  const node = parseIdentifierName(data, start);
  return node && !reservedWords.has(node.name)
    ? ast.identifier(node.start, node.end, node.name)
    : null;
};

export const parseIdentifierName = (
  data: string,
  start: number,
): IdentifierNode | null => {
  const node = lex(data, start);
  return match(node, tt.Name)
    ? ast.identifier(node.start, node.end, node.value)
    : null;
};

export const parseLiteral = (
  data: string,
  start: number,
): LiteralNode | null => {
  const token = lex(data, start);
  if (!token) return null;

  switch (token.type) {
    case tt.Name:
      switch (token.value) {
        case 'false':
          return ast.literal(token.start, token.end, false);
        case 'Infinity':
          return ast.literal(token.start, token.end, Infinity);
        case 'NaN':
          return ast.literal(token.start, token.end, NaN);
        case 'null':
          return ast.literal(token.start, token.end, null);
        case 'true':
          return ast.literal(token.start, token.end, true);
        case 'undefined':
          return ast.literal(token.start, token.end, undefined);
        default:
          return null;
      }
    case tt.Number:
      return ast.literal(token.start, token.end, Number(token.value));
    case tt.String:
      let value = '';

      for (let start = 1; start < token.value.length - 1; start++) {
        if (token.value[start] === '\\') {
          start++;
        }

        value += token.value[start];
      }

      return ast.literal(token.start, token.end, value);
    default:
      return null;
  }
};

export const parseMemberExpression = (
  data: string,
  start: number,
): Expression | null => {
  let i = start;

  const object = parsePrimaryExpression(data, i);
  if (object) i = object.end;
  else return null;

  const dot = consume(data, i, tt.Punctuator, '.');
  if (dot) {
    i = dot.end;

    const property = parseIdentifierName(data, i);
    if (property) i = property.end;
    else return null;

    return ast.staticMemberExpression(
      object.start,
      property.end,
      object,
      property,
    );
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

    return ast.computedMemberExpression(object.start, i, object, property);
  }

  return object;
};

export const parseObjectLiteral = (
  data: string,
  start: number,
): ObjectLiteralNode | null => {
  let i = start;

  const open = consume(data, i, tt.Punctuator, '{');
  if (open) i = open.end;
  else return null;

  const properties: Property[] = [];

  while (true) {
    const close = consume(data, i, tt.Punctuator, '}');
    if (close) {
      return ast.objectLiteral(open.start, close.end, properties);
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

    properties.push(ast.property(key.start, value.end, key, value));
  }
};

export const parsePrimaryExpression = (
  data: string,
  start: number,
): Expression | null => {
  return parseLiteral(data, start) ?? parseIdentifier(data, start);
};
