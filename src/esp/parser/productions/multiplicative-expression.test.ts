import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMultiplicativeExpression } from './multiplicative-expression';

const { error, ok, unused } = createParseAssert(parseMultiplicativeExpression);

suite('MultiplicativeExpression', () => {
  test(/* s */ `ExponentiationExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `MultiplicativeExpression MultiplicativeOperator ExponentiationExpression`, () => {
    ok('a*b');
    ok('a/b');
    ok('a%b');
    error('a*');
    error('a/');
    error('a%');
  });

  it('should respect operator precedence', () => {
    ok('a/-b%c');
  });
});
