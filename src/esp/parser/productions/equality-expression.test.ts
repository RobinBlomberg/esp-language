import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseEqualityExpression } from './equality-expression';

const { error, ok, unused } = createParseAssert(parseEqualityExpression);

suite('EqualityExpression', () => {
  test(/* s */ `RelationalExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `EqualityExpression '==' RelationalExpression`, () => {
    ok('a==b');
    error('a==');
  });

  test(/* s */ `EqualityExpression '!=' RelationalExpression`, () => {
    ok('a!=b');
    error('a!=');
  });

  it('should respect operator precedence', () => {
    ok('a==b<c!=d>=e');
  });
});
