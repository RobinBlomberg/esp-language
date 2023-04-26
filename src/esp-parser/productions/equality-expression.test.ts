import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseEqualityExpression } from './equality-expression';

const { error, ok, unused } = createParseAssert(parseEqualityExpression);

suite('EqualityExpression', () => {
  test('"RelationalExpression"', () => {
    unused();
    ok('RelationalExpression');
  });

  test('"EqualityExpression == RelationalExpression"', () => {
    ok('EqualityExpression == RelationalExpression');
    error('EqualityExpression ==');
  });

  test('"EqualityExpression != RelationalExpression"', () => {
    ok('EqualityExpression != RelationalExpression');
    error('EqualityExpression !=');
  });

  it('should respect operator precedence', () => {
    ok('a == b < c != d in e');
  });
});
