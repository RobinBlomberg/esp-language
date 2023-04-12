import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLogicalANDExpression } from './logical-and-expression';

const { fail, ok } = createParseAssert(parseLogicalANDExpression);

suite('LogicalANDExpression', () => {
  test('"BitwiseORExpression"', () => {
    ok('BitwiseORExpression');
  });

  test('"LogicalANDExpression && BitwiseORExpression"', () => {
    ok('LogicalANDExpression && BitwiseORExpression');
    fail('LogicalANDExpression &&');
  });

  it('should respect operator precedence', () => {
    ok('a && b | c && d | e');
  });
});
