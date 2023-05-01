import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseReturnStatement } from './return-statement';

const { error, ok, unused } = createParseAssert(parseReturnStatement);

suite('ReturnStatement', () => {
  test(/* s */ `'return' Expression ';'`, () => {
    unused();
    ok('return a;');
    ok('return(a);');
    error('return');
    error('return;');
    error('return a');
    error('return(');
    error('return(a');
    error('return(a)');
  });
});
