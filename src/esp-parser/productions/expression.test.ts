import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExpression } from './expression';

const { error, ok, throws, unused } = createParseAssert(parseExpression);

suite('Expression', () => {
  test('"ConditionalExpression"', () => {
    unused();
    ok('a');
    ok('(1+2)');
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
    ok('a=b');
    ok('a=b');
    ok('a*=b');
    ok('a/=b');
    ok('a%=b');
    ok('a+=b');
    ok('a-=b');
    ok('a<<=b');
    ok('a>>=b');
    ok('a>>>=b');
    ok('a&=b');
    ok('a^=b');
    ok('a|=b');
    ok('a**=b');
    ok('a&&=b');
    ok('a||=b');
    error('a=');
    error('a*=');
    error('a/=');
    error('a%=');
    error('a+=');
    error('a-=');
    error('a<<=');
    error('a>>=');
    error('a>>>=');
    error('a&=');
    error('a^=');
    error('a|=');
    error('a**=');
    error('a&&=');
    error('a||=');
    throws('a()=b');
  });
});
