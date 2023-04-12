import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLogicalORExpression } from './logical-or-expression';

const { fail, ok } = createParseAssert(parseLogicalORExpression);

suite('LogicalORExpression', () => {
  test('"LogicalANDExpression"', () => {
    ok('LogicalANDExpression');
  });

  test('"LogicalORExpression || LogicalANDExpression"', () => {
    ok('LogicalORExpression || LogicalANDExpression');
    fail('LogicalORExpression ||');
  });

  it('should respect operator precedence', () => {
    ok('a || b && c || d && e');
  });
});
