import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseFunction } from './function';

const { error, ok, unused } = createParseAssert(parseFunction);

suite('Function', () => {
  test('": ( ParameterList<opt> ) BlockStatement"', () => {
    unused();
    ok(':(){}');
    ok(':(a){}');
    ok(':(a,b){}');
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
  });

  test('": ( ParameterList<opt> ) Expression"', () => {
    ok(':()c;');
    ok(':(a)c;');
    ok(':(a,b)c;');
    error(':(a,)c;');
    error(':(a,b,)c;');
  });
});
