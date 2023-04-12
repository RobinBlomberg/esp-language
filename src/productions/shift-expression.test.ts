import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseShiftExpression } from './shift-expression';

const { fail, ok } = createParseAssert(parseShiftExpression);

suite('ShiftExpression', () => {
  test('"AdditiveExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    fail(' ');
  });

  describe('"ShiftExpression (<<|>>|>>>) AdditiveExpression"', () => {
    it('should parse', () => {
      ok('a << b');
      ok('a >> b');
      ok('a >>> b');
      fail('a <<');
      fail('a >>');
      fail('a >>>');
    });

    it('should respect operator precedence', () => {
      ok(
        'a << b + c >> d - e',
        BinaryExpression(
          0,
          19,
          '>>',
          BinaryExpression(
            0,
            10,
            '<<',
            Identifier(0, 1, 'a'),
            BinaryExpression(
              5,
              10,
              '+',
              Identifier(5, 6, 'b'),
              Identifier(9, 10, 'c'),
            ),
          ),
          BinaryExpression(
            14,
            19,
            '-',
            Identifier(14, 15, 'd'),
            Identifier(18, 19, 'e'),
          ),
        ),
      );
    });
  });
});
