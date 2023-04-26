import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMultiplicativeExpression } from './multiplicative-expression';

const { error, ok, unused } = createParseAssert(parseMultiplicativeExpression);

suite('MultiplicativeExpression', () => {
  test('"ExponentiationExpression"', () => {
    unused();
    ok('ExponentiationExpression');
  });

  test('"MultiplicativeExpression MultiplicativeOperator ExponentiationExpression"', () => {
    ok('MultiplicativeExpression * ExponentiationExpression');
    ok('MultiplicativeExpression / ExponentiationExpression');
    ok('MultiplicativeExpression % ExponentiationExpression');
    error('MultiplicativeExpression *');
    error('MultiplicativeExpression /');
    error('MultiplicativeExpression %');
  });

  it('should respect operator precedence', () => {
    ok('a / -b % c');
  });
});
