import { keywordsSet, punctuatorsSet } from '../esp-grammar';
import { Error, Unused } from './abrupt';
import { Token } from './token';
import { TokenType } from './token-type';

export const lex = (data: string, i: number): Token | Error | Unused => {
  let c = data[i];

  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
    c = data[++i];
  }

  const start = i;

  if (c === undefined) {
    return { type: 'Unused', start };
  }

  if (punctuatorsSet.has(c)) {
    let value = c;
    c = data[++i];

    while (c !== undefined && punctuatorsSet.has(value + c)) {
      value += c;
      c = data[++i];
    }

    if (value === '.' && c === '.' && data[i + 1] === '.') {
      value += c + data[++i]!;
      c = data[++i];
    }

    return { type: TokenType.Punctuator, start, end: i, value };
  }

  if (c === "'" || c === '"') {
    const quoteChar = c;
    let value = c;
    c = data[++i];

    while (c !== undefined && c !== quoteChar) {
      if (c === '\\') {
        value += '\\';
        c = data[++i];

        if (c === undefined) {
          return { type: 'Error', start };
        }
      }

      value += c;
      c = data[++i];
    }

    if (c !== quoteChar) {
      return { type: 'Error', start };
    }

    value += quoteChar;
    c = data[++i];
    return { type: TokenType.String, start, end: i, value };
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
        return { type: 'Error', start };
      }
    }

    return { type: TokenType.Number, start, end: i, value };
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
      type: keywordsSet.has(name) ? TokenType.Keyword : TokenType.Identifier,
      start,
      end: i,
      value: name,
    };
  }

  return { type: 'Error', start };
};
