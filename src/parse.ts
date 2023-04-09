import { createNode } from './create-node';
import { lex } from './lex';
import { NodeType as nt } from './node-type';
import {
  PrimaryExpression,
  IdentifierNode,
  LiteralNode,
  ArrayLiteralNode,
  Property,
  ObjectLiteralNode,
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
  if (open) {
    i = open.end;
  } else return null;

  const elements: PrimaryExpression[] = [];

  while (true) {
    const close = consume(data, i, tt.Punctuator, ']');
    if (close) {
      return createNode(open.start, close.end, nt.ArrayLiteral, { elements });
    }

    if (elements.length >= 1) {
      const comma = consume(data, i, tt.Punctuator, ',');
      if (comma) {
        i = comma.end;
      } else return null;
    }

    const element = parsePrimaryExpression(data, i);
    if (element) {
      i = element.end;
    } else return null;

    elements.push(element);
  }
};

export const parseIdentifier = (
  data: string,
  start: number,
): IdentifierNode | null => {
  const node = parseIdentifierName(data, start);

  if (!node || reservedWords.has(node.name)) {
    return null;
  }

  return createNode(node.start, node.end, nt.Identifier, { name: node.name });
};

export const parseIdentifierName = (
  data: string,
  start: number,
): IdentifierNode | null => {
  const node = lex(data, start);

  if (!match(node, tt.Name)) {
    return null;
  }

  return createNode(node.start, node.end, nt.Identifier, { name: node.value });
};

export const parseLiteral = (
  data: string,
  start: number,
): LiteralNode | null => {
  const token = lex(data, start);

  if (!token) {
    return null;
  }

  switch (token.type) {
    case tt.Name:
      switch (token.value) {
        case 'false':
          return createNode(token.start, token.end, nt.Literal, {
            value: false,
          });
        case 'Infinity':
          return createNode(token.start, token.end, nt.Literal, {
            value: Infinity,
          });
        case 'NaN':
          return createNode(token.start, token.end, nt.Literal, { value: NaN });
        case 'null':
          return createNode(token.start, token.end, nt.Literal, {
            value: null,
          });
        case 'true':
          return createNode(token.start, token.end, nt.Literal, {
            value: true,
          });
        case 'undefined':
          return createNode(token.start, token.end, nt.Literal, {
            value: undefined,
          });
        default:
          return null;
      }
    case tt.Number:
      return createNode(token.start, token.end, nt.Literal, {
        value: Number(token.value),
      });
    case tt.String:
      let value = '';

      for (let start = 1; start < token.value.length - 1; start++) {
        if (token.value[start] === '\\') {
          start++;
        }

        value += token.value[start];
      }

      return createNode(token.start, token.end, nt.Literal, { value });
    default:
      return null;
  }
};

export const parseObjectLiteral = (
  data: string,
  start: number,
): ObjectLiteralNode | null => {
  let i = start;

  const open = consume(data, i, tt.Punctuator, '{');
  if (open) {
    i = open.end;
  } else return null;

  const properties: Property[] = [];

  while (true) {
    const close = consume(data, i, tt.Punctuator, '}');
    if (close) {
      return createNode(open.start, close.end, nt.ObjectLiteral, {
        properties,
      });
    }

    if (properties.length >= 1) {
      const comma = consume(data, i, tt.Punctuator, ',');
      if (comma) {
        i = comma.end;
      } else return null;
    }

    const key = parseIdentifierName(data, i);
    if (key) {
      i = key.end;
    } else return null;

    const colon = consume(data, i, tt.Punctuator, ':');
    if (colon) {
      i = colon.end;
    } else return null;

    const value = parsePrimaryExpression(data, i);
    if (value) {
      i = value.end;
    } else return null;

    properties.push(
      createNode(key.start, value.end, nt.Property, { key, value }),
    );
  }
};

export const parsePrimaryExpression = (
  data: string,
  start: number,
): PrimaryExpression | null => {
  return parseLiteral(data, start) ?? parseIdentifier(data, start);
};
