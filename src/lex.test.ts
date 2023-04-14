import { expect, it, suite, test } from 'vitest';
import { lex } from './lex';
import { punctuators } from './punctuators';
import { TokenType } from './token-type';

const createAssert = (type: TokenType) => (data: string, expected?: string) => {
  const token = lex(data, 0);
  expect(token).not.toBeNull();
  expect(token!.type).toBe(type);
  expect(token!.value).toBe(expected ?? data);
};

const is = {
  error: (data: string) => expect(() => lex(data, 0)).toThrow(SyntaxError),
  keyword: createAssert(TokenType.Name),
  name: createAssert(TokenType.Name),
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

  test('name', () => {
    is.name('a');
    is.name('aa');
    is.name('zz');
    is.name('AA');
    is.name('ZZ');
    is.name('$$');
    is.name('__');
    is.name('a0');
    is.name('a#', 'a');
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

  it('should throw on invalid characters', () => {
    is.error('¤');
  });
});
