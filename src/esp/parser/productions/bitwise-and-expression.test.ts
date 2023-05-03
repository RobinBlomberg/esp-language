import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseANDExpression } from './bitwise-and-expression';

const { error, ok, unused } = createParseAssert(parseBitwiseANDExpression);

suite('BitwiseANDExpression', () => {
  test(/* s */ `EqualityExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `BitwiseANDExpression '&' EqualityExpression`, () => {
    ok('a&b');
    error('a&');
  });

  it('should respect operator precedence', () => {
    ok('a&b==c&d!=e');
  });
});
