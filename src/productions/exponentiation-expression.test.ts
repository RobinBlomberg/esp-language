import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier, UpdateExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseExponentiationExpression } from './exponentiation-expression';

const { fail, ok } = createParseAssert(parseExponentiationExpression);

suite('ExponentiationExpression', () => {
  test('"UnaryExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  describe('"UpdateExpression ** ExponentiationExpression"', () => {
    it('should handle non-nested exponentiation expressions', () => {
      ok(
        '++a ** b',
        BinaryExpression(
          0,
          8,
          '**',
          UpdateExpression(0, 3, '++', Identifier(2, 3, 'a'), true),
          Identifier(7, 8, 'b'),
        ),
      );
      fail('-a ** b');
    });

    it('should handle nested exponentiation expressions', () => {
      ok(
        'a ** --b ** c',
        BinaryExpression(
          0,
          13,
          '**',
          Identifier(0, 1, 'a'),
          BinaryExpression(
            5,
            13,
            '**',
            UpdateExpression(5, 8, '--', Identifier(7, 8, 'b'), true),
            Identifier(12, 13, 'c'),
          ),
        ),
      );
    });
  });
});
