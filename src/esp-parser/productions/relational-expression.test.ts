import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseRelationalExpression } from './relational-expression';

const { error, ok, unused } = createParseAssert(parseRelationalExpression);

suite('RelationalExpression', () => {
  test('"ShiftExpression"', () => {
    unused();
    ok('a');
  });

  test('"RelationalExpression < ShiftExpression"', () => {
    ok('a<b');
    error('a<');
  });

  test('"RelationalExpression > ShiftExpression"', () => {
    ok('a>b');
    error('a>');
  });

  test('"RelationalExpression <= ShiftExpression"', () => {
    ok('a<=b');
    error('a<=');
  });

  test('"RelationalExpression >= ShiftExpression"', () => {
    ok('a>=b');
    error('a>=');
  });

  it('should respect operator precedence', () => {
    ok('a<b<<c>=d>>e');
  });
});
