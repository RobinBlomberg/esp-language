import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseXORExpression } from './bitwise-xor-expression';

const { fail, ok } = createParseAssert(parseBitwiseXORExpression);

suite('BitwiseXORExpression', () => {
  test('"BitwiseANDExpression"', () => {
    ok('BitwiseANDExpression');
  });

  test('"BitwiseXORExpression ^ BitwiseANDExpression"', () => {
    ok('BitwiseXORExpression ^ BitwiseANDExpression');
    fail('BitwiseXORExpression ^');
  });

  it('should respect operator precedence', () => {
    ok('a ^ b & c ^ d & e');
  });
});
