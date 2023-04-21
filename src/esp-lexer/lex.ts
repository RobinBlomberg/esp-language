import { keywords, punctuators } from '../esp-grammar';
import { Token } from './token';
import { TokenType } from './token-type';
import { Parser } from './token-utils';

const createError = (c: string | undefined, i: number) => {
  return new SyntaxError(
    `Unexpected ${
      c ? `character ${JSON.stringify(c)}` : 'end of input'
    } at index ${i}`,
  );
};

export const lex: Parser<Token> = (data, i) => {
  let c = data[i];

  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
    c = data[++i];
  }

  if (c === undefined) {
    return null;
  }

  const start = i;

  if (punctuators.has(c)) {
    let value = c;
    c = data[++i];

    while (c !== undefined && punctuators.has(value + c)) {
      value += c;
      c = data[++i];
    }

    if (value === '.' && c === '.' && data[i + 1] === '.') {
      value += c + data[++i]!;
      c = data[++i];
    }

    return { end: i, start, type: TokenType.Punctuator, value };
  }

  if (c === '"') {
    let value = '"';
    c = data[++i];

    while (c !== undefined && c !== '"') {
      if (c === '\\') {
        value += '\\';
        c = data[++i];

        if (c === undefined) {
          throw createError(c, i);
        }
      }

      value += c;
      c = data[++i];
    }

    if (c !== '"') {
      throw createError(c, i);
    }

    value += '"';
    c = data[++i];
    return { end: i, start, type: TokenType.String, value };
  }

  if (c >= '0' && c <= '9') {
    let value = c;
    c = data[++i];

    if (value !== '0') {
      while (c !== undefined && c >= '0' && c <= '9') {
        value += c;
        c = data[++i];
      }
    }

    if (c === '.') {
      value += c;
      c = data[++i];

      if (c !== undefined && c >= '0' && c <= '9') {
        while (c !== undefined && c >= '0' && c <= '9') {
          value += c;
          c = data[++i];
        }
      } else {
        throw createError(c, i);
      }
    }

    return { end: i, start, type: TokenType.Number, value };
  }

  if (
    c !== undefined &&
    ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '$' || c === '_')
  ) {
    let name = c;
    c = data[++i];

    while (
      c !== undefined &&
      ((c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c >= '0' && c <= '9') ||
        c === '$' ||
        c === '_')
    ) {
      name += c;
      c = data[++i];
    }

    return {
      end: i,
      start,
      type: keywords.has(name) ? TokenType.Keyword : TokenType.Identifier,
      value: name,
    };
  }

  throw createError(c, i);
};
