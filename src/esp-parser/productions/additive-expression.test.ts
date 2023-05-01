import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseAdditiveExpression } from './additive-expression';

const { error, ok, unused } = createParseAssert(parseAdditiveExpression);

suite('AdditiveExpression', () => {
  test(/* s */ `MultiplicativeExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `AdditiveExpression '+' MultiplicativeExpression`, () => {
    ok('a+b');
    error('a+');
  });

  test(/* s */ `AdditiveExpression '-' MultiplicativeExpression`, () => {
    ok('a-b');
    error('a-');
  });

  it('should respect operator precedence', () => {
    ok('a+b*c-d/e');
  });
});
