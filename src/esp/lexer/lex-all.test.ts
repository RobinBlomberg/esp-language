import { expect, it, suite } from 'vitest';
import { lexAll } from './lex-all';
import { IdentifierToken, KeywordToken, PunctuatorToken } from './token';

suite('lexAll', () => {
  it('should return a list of tokens', () => {
    expect(lexAll('const add = (a, b) {', 0)).toEqual([
      KeywordToken(0, 5, 'const'),
      IdentifierToken(6, 9, 'add'),
      PunctuatorToken(10, 11, '='),
      PunctuatorToken(12, 13, '('),
      IdentifierToken(13, 14, 'a'),
      PunctuatorToken(14, 15, ','),
      IdentifierToken(16, 17, 'b'),
      PunctuatorToken(17, 18, ')'),
      PunctuatorToken(19, 20, '{'),
    ]);
  });
});
