import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLogicalANDExpression } from './logical-and-expression';

const { error, ok, unused } = createParseAssert(parseLogicalANDExpression);

suite('LogicalANDExpression', () => {
  test('"BitwiseORExpression"', () => {
    unused();
    ok('a');
  });

  test('"LogicalANDExpression && BitwiseORExpression"', () => {
    ok('a&&b');
    error('a&&');
  });

  it('should respect operator precedence', () => {
    ok('a&&b|c&&d|e');
  });
});
