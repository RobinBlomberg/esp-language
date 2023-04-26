import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseANDExpression } from './bitwise-and-expression';

const { error, ok, unused } = createParseAssert(parseBitwiseANDExpression);

suite('BitwiseANDExpression', () => {
  test('"EqualityExpression"', () => {
    unused();
    ok('EqualityExpression');
  });

  test('"BitwiseANDExpression & EqualityExpression"', () => {
    ok('BitwiseANDExpression & EqualityExpression');
    error('BitwiseANDExpression &');
  });

  it('should respect operator precedence', () => {
    ok('a & b == c & d != e');
  });
});
