import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseORExpression } from './bitwise-or-expression';

const { error, ok, unused } = createParseAssert(parseBitwiseORExpression);

suite('BitwiseORExpression', () => {
  test('"BitwiseXORExpression"', () => {
    unused();
    ok('BitwiseXORExpression');
  });

  test('"BitwiseORExpression | BitwiseXORExpression"', () => {
    ok('BitwiseORExpression | BitwiseXORExpression');
    error('BitwiseORExpression |');
  });

  it('should respect operator precedence', () => {
    ok('a | b ^ c | d ^ e');
  });
});
