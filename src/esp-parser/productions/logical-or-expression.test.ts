import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLogicalORExpression } from './logical-or-expression';

const { error, ok, unused } = createParseAssert(parseLogicalORExpression);

suite('LogicalORExpression', () => {
  test('"LogicalANDExpression"', () => {
    unused();
    ok('LogicalANDExpression');
  });

  test('"LogicalORExpression || LogicalANDExpression"', () => {
    ok('LogicalORExpression || LogicalANDExpression');
    error('LogicalORExpression ||');
  });

  it('should respect operator precedence', () => {
    ok('a || b && c || d && e');
  });
});
