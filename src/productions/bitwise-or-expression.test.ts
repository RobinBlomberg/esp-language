import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseORExpression } from './bitwise-or-expression';

const { fail, ok } = createParseAssert(parseBitwiseORExpression);

suite('BitwiseORExpression', () => {
  test('"BitwiseXORExpression"', () => {
    ok('BitwiseXORExpression');
  });

  test('"BitwiseORExpression | BitwiseXORExpression"', () => {
    ok('BitwiseORExpression | BitwiseXORExpression');
    fail('BitwiseORExpression |');
  });

  it('should respect operator precedence', () => {
    ok('a | b ^ c | d ^ e');
  });
});
