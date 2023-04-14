import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseANDExpression } from './bitwise-and-expression';

const { fail, ok } = createParseAssert(parseBitwiseANDExpression);

suite('BitwiseANDExpression', () => {
  test('"EqualityExpression"', () => {
    ok('EqualityExpression');
  });

  test('"BitwiseANDExpression & EqualityExpression"', () => {
    ok('BitwiseANDExpression & EqualityExpression');
    fail('BitwiseANDExpression &');
  });

  it('should respect operator precedence', () => {
    ok('a & b == c & d != e');
  });
});
