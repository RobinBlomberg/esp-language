import { punctuators } from './punctuators';
import { Token } from './token';
import { TokenType } from './token-type';

export const lex = (data: string, i: number): Token | null => {
  let c = data[i];

  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
    c = data[++i];
  }

  if (c === undefined) {
    return null;
  }

  const start = i;

  const createError = () => {
    return new SyntaxError(
      `Unexpected character ${JSON.stringify(c)} at index ${i}`,
    );
  };

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
          throw createError();
        }
      }

      value += c;
      c = data[++i];
    }

    if (c !== '"') {
      throw createError();
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
        throw createError();
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

    return { end: i, start, type: TokenType.Name, value: name };
  }

  throw createError();
};
