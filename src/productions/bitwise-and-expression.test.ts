import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseBitwiseANDExpression } from './bitwise-and-expression';

const { ok } = createParseAssert(parseBitwiseANDExpression);

suite('BitwiseANDExpression', () => {
  test('"EqualityExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  describe('"BitwiseANDExpression & EqualityExpression"', () => {
    it('should respect operator precedence', () => {
      ok(
        'a & b == c & d != e',
        BinaryExpression(
          0,
          19,
          '&',
          BinaryExpression(
            0,
            10,
            '&',
            Identifier(0, 1, 'a'),
            BinaryExpression(
              4,
              10,
              '==',
              Identifier(4, 5, 'b'),
              Identifier(9, 10, 'c'),
            ),
          ),
          BinaryExpression(
            13,
            19,
            '!=',
            Identifier(13, 14, 'd'),
            Identifier(18, 19, 'e'),
          ),
        ),
      );
    });
  });
});
