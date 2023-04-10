import { describe, it, suite, test } from 'vitest';
import { BinaryExpression, Identifier, UnaryExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseExponentiationExpression } from './exponentiation-expression';

const { ok } = createParseAssert(parseExponentiationExpression);

suite('ExponentiationExpression', () => {
  test('UnaryExpression', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  describe('UpdateExpression ** ExponentiationExpression', () => {
    it('should handle non-nested exponentiation expressions', () => {
      ok(
        'a ** b',
        BinaryExpression(
          0,
          6,
          '**',
          Identifier(0, 1, 'a'),
          Identifier(5, 6, 'b'),
        ),
      );
    });

    it('should handle nested exponentiation expressions', () => {
      ok(
        'a ** -b ** c',
        BinaryExpression(
          0,
          12,
          '**',
          Identifier(0, 1, 'a'),
          BinaryExpression(
            5,
            12,
            '**',
            UnaryExpression(5, 7, '-', Identifier(6, 7, 'b')),
            Identifier(11, 12, 'c'),
          ),
        ),
      );
    });
  });
});
