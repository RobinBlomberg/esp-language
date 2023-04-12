import { describe, it, suite, test } from 'vitest';
import { Arguments, CallExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';

const { ok } = createParseAssert(parseLeftHandSideExpression);

suite('LeftHandSideExpression', () => {
  test('"NewExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  describe('"CallExpression"', () => {
    it('should handle non-nested call expressions', () => {
      ok(
        'a()',
        CallExpression(0, 3, Identifier(0, 1, 'a'), Arguments(1, 3, [])),
      );
      ok(
        'a(b)',
        CallExpression(
          0,
          4,
          Identifier(0, 1, 'a'),
          Arguments(1, 4, [Identifier(2, 3, 'b')]),
        ),
      );
      ok(
        'a(b, c)',
        CallExpression(
          0,
          7,
          Identifier(0, 1, 'a'),
          Arguments(1, 7, [Identifier(2, 3, 'b'), Identifier(5, 6, 'c')]),
        ),
      );
    });

    it('should handle nested call expressions', () => {
      ok(
        'a()()',
        CallExpression(
          0,
          5,
          CallExpression(0, 3, Identifier(0, 1, 'a'), Arguments(1, 3, [])),
          Arguments(3, 5, []),
        ),
      );
      ok(
        'a(b)(c, d)',
        CallExpression(
          0,
          10,
          CallExpression(
            0,
            4,
            Identifier(0, 1, 'a'),
            Arguments(1, 4, [Identifier(2, 3, 'b')]),
          ),
          Arguments(4, 10, [Identifier(5, 6, 'c'), Identifier(8, 9, 'd')]),
        ),
      );
    });
  });
});
