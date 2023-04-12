import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseLogicalORExpression } from './logical-or-expression';

const { fail, ok } = createParseAssert(parseLogicalORExpression);

suite('LogicalORExpression', () => {
  test('"LogicalANDExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    fail(' ');
  });

  describe('"LogicalORExpression || LogicalANDExpression"', () => {
    it('should parse', () => {
      ok('a || b');
      fail('a ||');
    });

    it('should respect operator precedence', () => {
      ok(
        'a || b && c || d && e',
        BinaryExpression(
          0,
          21,
          '||',
          BinaryExpression(
            0,
            11,
            '||',
            Identifier(0, 1, 'a'),
            BinaryExpression(
              5,
              11,
              '&&',
              Identifier(5, 6, 'b'),
              Identifier(10, 11, 'c'),
            ),
          ),
          BinaryExpression(
            15,
            21,
            '&&',
            Identifier(15, 16, 'd'),
            Identifier(20, 21, 'e'),
          ),
        ),
      );
    });
  });
});
