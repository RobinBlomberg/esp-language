import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseRelationalExpression } from './relational-expression';

const { fail, ok } = createParseAssert(parseRelationalExpression);

suite('RelationalExpression', () => {
  test('"ShiftExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    fail(' ');
  });

  describe('"RelationalExpression (<|>|<=|>=|instanceof|in) ShiftExpression"', () => {
    it('should parse', () => {
      ok('a < b');
      ok('a > b');
      ok('a <= b');
      ok('a >= b');
      ok('a instanceof b');
      ok('a in b');
      fail('a <');
      fail('a >');
      fail('a <=');
      fail('a >=');
      fail('a instanceof');
      fail('a in');
    });

    it('should respect operator precedence', () => {
      ok(
        'a < b << c in d >> e',
        BinaryExpression(
          0,
          20,
          'in',
          BinaryExpression(
            0,
            10,
            '<',
            Identifier(0, 1, 'a'),
            BinaryExpression(
              4,
              10,
              '<<',
              Identifier(4, 5, 'b'),
              Identifier(9, 10, 'c'),
            ),
          ),
          BinaryExpression(
            14,
            20,
            '>>',
            Identifier(14, 15, 'd'),
            Identifier(19, 20, 'e'),
          ),
        ),
      );
    });
  });
});
