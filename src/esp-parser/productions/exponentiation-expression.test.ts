import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExponentiationExpression } from './exponentiation-expression';

const { error, ok, unused } = createParseAssert(parseExponentiationExpression);

suite('ExponentiationExpression', () => {
  test('"UnaryExpression"', () => {
    unused();
    ok('UnaryExpression');
  });

  test('"UpdateExpression ** ExponentiationExpression"', () => {
    ok('UpdateExpression ** ExponentiationExpression');
    ok('++UpdateExpression ** ExponentiationExpression');
    error('UpdateExpression **');
  });

  it('should respect operator precedence', () => {
    ok('a ** --b ** c');
  });
});
