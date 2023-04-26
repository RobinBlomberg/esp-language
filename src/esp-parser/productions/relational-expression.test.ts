import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseRelationalExpression } from './relational-expression';

const { error, ok, unused } = createParseAssert(parseRelationalExpression);

suite('RelationalExpression', () => {
  test('"ShiftExpression"', () => {
    unused();
    ok('ShiftExpression');
  });

  test('"RelationalExpression < ShiftExpression"', () => {
    ok('RelationalExpression < ShiftExpression');
    error('RelationalExpression <');
  });

  test('"RelationalExpression > ShiftExpression"', () => {
    ok('RelationalExpression > ShiftExpression');
    error('RelationalExpression >');
  });

  test('"RelationalExpression <= ShiftExpression"', () => {
    ok('RelationalExpression <= ShiftExpression');
    error('RelationalExpression <=');
  });

  test('"RelationalExpression >= ShiftExpression"', () => {
    ok('RelationalExpression >= ShiftExpression');
    error('RelationalExpression >=');
  });

  it('should respect operator precedence', () => {
    ok('a < b << c >= d >> e');
  });
});
