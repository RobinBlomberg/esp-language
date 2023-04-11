import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseRelationalExpression } from './relational-expression';

const { ok } = createParseAssert(parseRelationalExpression);

suite('RelationalExpression', () => {
  test('"ShiftExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  describe('"RelationalExpression (<|>|<=|>=|instanceof|in) ShiftExpression"', () => {
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
