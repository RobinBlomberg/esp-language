import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseEqualityExpression } from './equality-expression';

const { fail, ok } = createParseAssert(parseEqualityExpression);

suite('EqualityExpression', () => {
  test('"RelationalExpression"', () => {
    ok('RelationalExpression');
  });

  test('"EqualityExpression == RelationalExpression"', () => {
    ok('EqualityExpression == RelationalExpression');
    fail('EqualityExpression ==');
  });

  test('"EqualityExpression != RelationalExpression"', () => {
    ok('EqualityExpression != RelationalExpression');
    fail('EqualityExpression !=');
  });

  it('should respect operator precedence', () => {
    ok('a == b < c != d in e');
  });
});
