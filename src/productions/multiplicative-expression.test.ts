import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier, UnaryExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseMultiplicativeExpression } from './multiplicative-expression';

const { ok } = createParseAssert(parseMultiplicativeExpression);

suite('MultiplicativeExpression', () => {
  test('"ExponentiationExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  describe('"MultiplicativeExpression MultiplicativeOperator ExponentiationExpression"', () => {
    it('should handle non-nested multiplicative expressions', () => {
      ok(
        'a * b',
        BinaryExpression(
          0,
          5,
          '*',
          Identifier(0, 1, 'a'),
          Identifier(4, 5, 'b'),
        ),
      );
    });

    it('should handle nested multiplicative expressions', () => {
      ok(
        'a / -b % c',
        BinaryExpression(
          0,
          10,
          '%',
          BinaryExpression(
            0,
            6,
            '/',
            Identifier(0, 1, 'a'),
            UnaryExpression(4, 6, '-', Identifier(5, 6, 'b')),
          ),
          Identifier(9, 10, 'c'),
        ),
      );
    });
  });
});
