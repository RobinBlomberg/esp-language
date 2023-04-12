import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseLogicalANDExpression } from './logical-and-expression';

const { fail, ok } = createParseAssert(parseLogicalANDExpression);

suite('LogicalANDExpression', () => {
  test('"BitwiseORExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    fail(' ');
  });

  describe('"LogicalANDExpression && BitwiseORExpression"', () => {
    it('should parse', () => {
      ok('a && b');
      fail('a &&');
    });

    it('should respect operator precedence', () => {
      ok(
        'a && b | c && d | e',
        BinaryExpression(
          0,
          19,
          '&&',
          BinaryExpression(
            0,
            10,
            '&&',
            Identifier(0, 1, 'a'),
            BinaryExpression(
              5,
              10,
              '|',
              Identifier(5, 6, 'b'),
              Identifier(9, 10, 'c'),
            ),
          ),
          BinaryExpression(
            14,
            19,
            '|',
            Identifier(14, 15, 'd'),
            Identifier(18, 19, 'e'),
          ),
        ),
      );
    });
  });
});
