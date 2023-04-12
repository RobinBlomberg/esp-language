import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMultiplicativeExpression } from './multiplicative-expression';

const { fail, ok } = createParseAssert(parseMultiplicativeExpression);

suite('MultiplicativeExpression', () => {
  test('"ExponentiationExpression"', () => {
    ok('ExponentiationExpression');
  });

  test('"MultiplicativeExpression MultiplicativeOperator ExponentiationExpression"', () => {
    ok('MultiplicativeExpression * ExponentiationExpression');
    ok('MultiplicativeExpression / ExponentiationExpression');
    ok('MultiplicativeExpression % ExponentiationExpression');
    fail('MultiplicativeExpression *');
    fail('MultiplicativeExpression /');
    fail('MultiplicativeExpression %');
  });

  it('should respect operator precedence', () => {
    ok('a / -b % c');
  });
});
