import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseAdditiveExpression } from './additive-expression';

const { fail, ok } = createParseAssert(parseAdditiveExpression);

suite('AdditiveExpression', () => {
  test('"MultiplicativeExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    fail(' ');
  });

  describe('"AdditiveExpression (+|-) MultiplicativeExpression"', () => {
    it('should parse', () => {
      ok('a + b');
      ok('a - b');
      fail('a +');
      fail('a -');
    });

    it('should respect operator precedence', () => {
      ok(
        'a + b * c - d / e',
        BinaryExpression(
          0,
          17,
          '-',
          BinaryExpression(
            0,
            9,
            '+',
            Identifier(0, 1, 'a'),
            BinaryExpression(
              4,
              9,
              '*',
              Identifier(4, 5, 'b'),
              Identifier(8, 9, 'c'),
            ),
          ),
          BinaryExpression(
            12,
            17,
            '/',
            Identifier(12, 13, 'd'),
            Identifier(16, 17, 'e'),
          ),
        ),
      );
    });
  });
});
