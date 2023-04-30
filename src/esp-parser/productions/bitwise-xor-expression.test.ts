import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseXORExpression } from './bitwise-xor-expression';

const { error, ok, unused } = createParseAssert(parseBitwiseXORExpression);

suite('BitwiseXORExpression', () => {
  test('"BitwiseANDExpression"', () => {
    unused();
    ok('a');
  });

  test('"BitwiseXORExpression ^ BitwiseANDExpression"', () => {
    ok('a^b');
    error('a^');
  });

  it('should respect operator precedence', () => {
    ok('a^b&c^d&e');
  });
});
