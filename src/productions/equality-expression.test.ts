import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseEqualityExpression } from './equality-expression';

const { fail, ok } = createParseAssert(parseEqualityExpression);

suite('EqualityExpression', () => {
  test('"RelationalExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    fail(' ');
  });

  describe('"EqualityExpression (==|!=) RelationalExpression"', () => {
    it('should parse', () => {
      ok('a == b');
      ok('a != b');
      fail('a ==');
      fail('a !=');
    });

    it('should respect operator precedence', () => {
      ok(
        'a == b < c != d in e',
        BinaryExpression(
          0,
          20,
          '!=',
          BinaryExpression(
            0,
            10,
            '==',
            Identifier(0, 1, 'a'),
            BinaryExpression(
              5,
              10,
              '<',
              Identifier(5, 6, 'b'),
              Identifier(9, 10, 'c'),
            ),
          ),
          BinaryExpression(
            14,
            20,
            'in',
            Identifier(14, 15, 'd'),
            Identifier(19, 20, 'e'),
          ),
        ),
      );
    });
  });
});
