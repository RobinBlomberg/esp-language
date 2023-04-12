import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExpression } from './expression';

const { fail, ok, throws } = createParseAssert(parseExpression);

suite('Expression', () => {
  test('"ConditionalExpression"', () => {
    ok('ConditionalExpression');
  });

  test('"LeftHandSideExpression AssignmentOperator Expression"', () => {
    ok('LeftHandSideExpression = Expression');
    ok('LeftHandSideExpression = Expression');
    ok('LeftHandSideExpression *= Expression');
    ok('LeftHandSideExpression /= Expression');
    ok('LeftHandSideExpression %= Expression');
    ok('LeftHandSideExpression += Expression');
    ok('LeftHandSideExpression -= Expression');
    ok('LeftHandSideExpression <<= Expression');
    ok('LeftHandSideExpression >>= Expression');
    ok('LeftHandSideExpression >>>= Expression');
    ok('LeftHandSideExpression &= Expression');
    ok('LeftHandSideExpression ^= Expression');
    ok('LeftHandSideExpression |= Expression');
    ok('LeftHandSideExpression **= Expression');
    ok('LeftHandSideExpression &&= Expression');
    ok('LeftHandSideExpression ||= Expression');
    fail('LeftHandSideExpression =');
    fail('LeftHandSideExpression *=');
    fail('LeftHandSideExpression /=');
    fail('LeftHandSideExpression %=');
    fail('LeftHandSideExpression +=');
    fail('LeftHandSideExpression -=');
    fail('LeftHandSideExpression <<=');
    fail('LeftHandSideExpression >>=');
    fail('LeftHandSideExpression >>>=');
    fail('LeftHandSideExpression &=');
    fail('LeftHandSideExpression ^=');
    fail('LeftHandSideExpression |=');
    fail('LeftHandSideExpression **=');
    fail('LeftHandSideExpression &&=');
    fail('LeftHandSideExpression ||=');
    throws('LeftHandSideExpression() = Expression');
  });
});
