import { describe, expect, it, suite, test } from 'vitest';
import { keywords, punctuators } from '../esp-grammar';
import { lex } from './lex';
import { TokenType } from './token-type';

const createAssert = (type: TokenType) => (data: string, expected?: string) => {
  const token = lex(data, 0);
  expect(token).not.toBeNull();
  expect(token!.type).toBe(type);
  expect(token!.value).toBe(expected ?? data);
};

const is = {
  error: (data: string) => expect(() => lex(data, 0)).toThrow(SyntaxError),
  identifier: createAssert(TokenType.Identifier),
  keyword: createAssert(TokenType.Keyword),
  null: (data: string) => expect(lex(data, 0)).toBeNull(),
  number: createAssert(TokenType.Number),
  punctuator: createAssert(TokenType.Punctuator),
  string: createAssert(TokenType.String),
};

suite('lex', () => {
  test('whitespace', () => {
    is.null(' \t\n\r');
  });

  test('punctuators', () => {
    for (const punctuator of punctuators) {
      is.punctuator(punctuator);
    }
  });

  test('keyword', () => {
    for (const keyword of keywords) {
      is.keyword(keyword);
    }
  });

  test('identifier', () => {
    is.identifier('a');
    is.identifier('aa');
    is.identifier('zz');
    is.identifier('AA');
    is.identifier('ZZ');
    is.identifier('$$');
    is.identifier('__');
    is.identifier('a0');
    is.identifier('a#', 'a');
  });

  suite('number', () => {
    it('should handle integers', () => {
      is.number('0');
      is.number('01', '0');
      is.number('11');
      is.number('9876543210');
    });

    it('should handle decimals', () => {
      is.error('0.');
      is.error('0.a');
      is.number('0.0');
      is.number('0.123');
      is.number('123.987');
    });
  });

  suite('string', () => {
    describe('double-quoted strings', () => {
      it('should handle basic strings', () => {
        is.error('"');
        is.string('""');
        is.string('"abc"');
      });

      it('should handle escape characters', () => {
        is.error('"\\');
        is.string('"\\""');
        is.string('"ab\\"cd"');
      });
    });

    describe('single-quoted strings', () => {
      it('should handle basic strings', () => {
        is.error("'");
        is.string("''");
        is.string("'abc'");
      });

      it('should handle escape characters', () => {
        is.error("'\\");
        is.string("'\\''");
        is.string("'ab\\'cd'");
      });
    });
  });

  it('should throw on invalid characters', () => {
    is.error('¤');
  });
});
