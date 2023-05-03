import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExponentiationExpression } from './exponentiation-expression';

const { error, ok, unused } = createParseAssert(parseExponentiationExpression);

suite('ExponentiationExpression', () => {
  test(/* s */ `UnaryExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `UpdateExpression '**' ExponentiationExpression`, () => {
    ok('a**b');
    ok('++a**b');
    error('a**');
    error('-a**b');
  });

  it('should respect operator precedence', () => {
    ok('a**--b**c');
  });
});
