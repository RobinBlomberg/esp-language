import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExpression } from './expression';

const { error, ok, throws, unused } = createParseAssert(parseExpression);

suite('Expression', () => {
  test('"ConditionalExpression"', () => {
    unused();
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
    error('LeftHandSideExpression =');
    error('LeftHandSideExpression *=');
    error('LeftHandSideExpression /=');
    error('LeftHandSideExpression %=');
    error('LeftHandSideExpression +=');
    error('LeftHandSideExpression -=');
    error('LeftHandSideExpression <<=');
    error('LeftHandSideExpression >>=');
    error('LeftHandSideExpression >>>=');
    error('LeftHandSideExpression &=');
    error('LeftHandSideExpression ^=');
    error('LeftHandSideExpression |=');
    error('LeftHandSideExpression **=');
    error('LeftHandSideExpression &&=');
    error('LeftHandSideExpression ||=');
    throws('LeftHandSideExpression() = Expression');
  });
});
