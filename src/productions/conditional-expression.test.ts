import { describe, it, suite, test } from 'vitest';
import { ConditionalExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseConditionalExpression } from './conditional-expression';

const { fail, ok } = createParseAssert(parseConditionalExpression);

suite('ConditionalExpression', () => {
  test('"LogicalORExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    ok('a()');
    fail(' ');
  });

  describe('"LogicalORExpression ? Expression : Expression"', () => {
    it('should handle non-nested conditional expressions', () => {
      ok(
        'a ? b : c',
        ConditionalExpression(
          0,
          9,
          Identifier(0, 1, 'a'),
          Identifier(4, 5, 'b'),
          Identifier(8, 9, 'c'),
        ),
      );
      fail('a ?');
      fail('a ? b');
      fail('a ? b :');
    });

    it('should handle nested conditional expressions', () => {
      ok(
        'a ? b ? c : d : e',
        ConditionalExpression(
          0,
          17,
          Identifier(0, 1, 'a'),
          ConditionalExpression(
            4,
            13,
            Identifier(4, 5, 'b'),
            Identifier(8, 9, 'c'),
            Identifier(12, 13, 'd'),
          ),
          Identifier(16, 17, 'e'),
        ),
      );
      fail('a ? b ?');
      fail('a ? b ? c');
      fail('a ? b ? c :');
      fail('a ? b ? c : d');
      fail('a ? b ? c : d :');
    });
  });
});
