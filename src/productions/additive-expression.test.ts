import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseAdditiveExpression } from './additive-expression';

const { fail, ok } = createParseAssert(parseAdditiveExpression);

suite('AdditiveExpression', () => {
  test('"MultiplicativeExpression"', () => {
    ok('MultiplicativeExpression');
  });

  test('"AdditiveExpression + MultiplicativeExpression"', () => {
    ok('a + b');
    fail('a +');
  });

  test('"AdditiveExpression - MultiplicativeExpression"', () => {
    ok('a - b');
    fail('a -');
  });

  it('should respect operator precedence', () => {
    ok('a + b * c - d / e');
  });
});
