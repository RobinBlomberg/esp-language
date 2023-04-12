import { describe, it, suite, test } from 'vitest';
import { AssignmentExpression, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseExpression } from './expression';

const { fail, ok, throws } = createParseAssert(parseExpression);

suite('Expression', () => {
  test('"ConditionalExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    ok('a()');
    fail(' ');
  });

  describe('"LeftHandSideExpression AssignmentOperator Expression"', () => {
    it('should handle simple assigments', () => {
      ok(
        'a = b',
        AssignmentExpression(
          0,
          5,
          '=',
          Identifier(0, 1, 'a'),
          Identifier(4, 5, 'b'),
        ),
      );
      ok('a = b');
      ok('a *= b');
      ok('a /= b');
      ok('a %= b');
      ok('a += b');
      ok('a -= b');
      ok('a <<= b');
      ok('a >>= b');
      ok('a >>>= b');
      ok('a &= b');
      ok('a ^= b');
      ok('a |= b');
      ok('a **= b');
      ok('a &&= b');
      ok('a ||= b');
      fail('a =');
      fail('a *=');
      fail('a /=');
      fail('a %=');
      fail('a +=');
      fail('a -=');
      fail('a <<=');
      fail('a >>=');
      fail('a >>>=');
      fail('a &=');
      fail('a ^=');
      fail('a |=');
      fail('a **=');
      fail('a &&=');
      fail('a ||=');
    });

    it('should throw an early error if the left-hand side is not simple', () => {
      throws('a() = b');
    });
  });
});
