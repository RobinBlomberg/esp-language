import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBitwiseORExpression } from './bitwise-or-expression';

const { error, ok, unused } = createParseAssert(parseBitwiseORExpression);

suite('BitwiseORExpression', () => {
  test(/* s */ `BitwiseXORExpression`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `BitwiseORExpression '|' BitwiseXORExpression`, () => {
    ok('a|b');
    error('a|');
  });

  it('should respect operator precedence', () => {
    ok('a|b^c|d^e');
  });
});
