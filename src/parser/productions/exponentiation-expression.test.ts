import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExponentiationExpression } from './exponentiation-expression';

const { fail, ok } = createParseAssert(parseExponentiationExpression);

suite('ExponentiationExpression', () => {
  test('"UnaryExpression"', () => {
    ok('UnaryExpression');
  });

  test('"UpdateExpression ** ExponentiationExpression"', () => {
    ok('UpdateExpression ** ExponentiationExpression');
    ok('++UpdateExpression ** ExponentiationExpression');
    fail('UpdateExpression **');
  });

  it('should respect operator precedence', () => {
    ok('a ** --b ** c');
  });
});
