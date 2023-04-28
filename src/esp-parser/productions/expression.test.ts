import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExpression } from './expression';

const { error, ok, throws, unused } = createParseAssert(parseExpression);

suite('Expression', () => {
  test('"ConditionalExpression"', () => {
    unused();
    ok('ConditionalExpression');
  });

  test('"Function"', () => {
    ok(':(){}');
    ok(':(a){}');
    ok(':(a,b){}');
    ok(':()c;');
    ok(':(a)c;');
    ok(':(a,b)c;');
    error(':');
    error(':(');
    error(':()');
    error(':(){');
    error(':(,');
    error(':(a');
    error(':(a,');
    error(':(a)');
    error(':(a){');
    error(':(a b){}');
    error(':(a,');
    error(':(a,){}');
    error(':(a,b');
    error(':(a,b)');
    error(':(a,b){');
    error(':(a,b,){}');
    error(':(a,)c;');
    error(':(a,b,)c;');
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
