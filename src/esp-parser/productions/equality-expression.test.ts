import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseEqualityExpression } from './equality-expression';

const { error, ok, unused } = createParseAssert(parseEqualityExpression);

suite('EqualityExpression', () => {
  test('"RelationalExpression"', () => {
    unused();
    ok('a');
  });

  test('"EqualityExpression == RelationalExpression"', () => {
    ok('a==b');
    error('a==');
  });

  test('"EqualityExpression != RelationalExpression"', () => {
    ok('a!=b');
    error('a!=');
  });

  it('should respect operator precedence', () => {
    ok('a==b<c!=d in e');
  });
});
