import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLogicalORExpression } from './logical-or-expression';

const { error, ok, unused } = createParseAssert(parseLogicalORExpression);

suite('LogicalORExpression', () => {
  test(/* s */ `LogicalANDExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `LogicalORExpression '||' LogicalANDExpression`, () => {
    ok('a||b');
    error('a||');
  });

  it('should respect operator precedence', () => {
    ok('a||b&&c||d&&e');
  });
});
