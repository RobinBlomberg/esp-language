import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseRelationalExpression } from './relational-expression';

const { fail, ok } = createParseAssert(parseRelationalExpression);

suite('RelationalExpression', () => {
  test('"ShiftExpression"', () => {
    ok('ShiftExpression');
  });

  test('"RelationalExpression < ShiftExpression"', () => {
    ok('RelationalExpression < ShiftExpression');
    fail('RelationalExpression <');
  });

  test('"RelationalExpression > ShiftExpression"', () => {
    ok('RelationalExpression > ShiftExpression');
    fail('RelationalExpression >');
  });

  test('"RelationalExpression <= ShiftExpression"', () => {
    ok('RelationalExpression <= ShiftExpression');
    fail('RelationalExpression <=');
  });

  test('"RelationalExpression >= ShiftExpression"', () => {
    ok('RelationalExpression >= ShiftExpression');
    fail('RelationalExpression >=');
  });

  it('should respect operator precedence', () => {
    ok('a < b << c >= d >> e');
  });
});
