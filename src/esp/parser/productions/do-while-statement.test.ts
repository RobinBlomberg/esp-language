import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseDoWhileStatement } from './do-while-statement';

const { error, ok, unused } = createParseAssert(parseDoWhileStatement);

suite('DoWhileStatement', () => {
  test(/* s */ `'do' Statement 'while' '(' Expression ')' ';'`, () => {
    unused();
    ok('do a;while(b);');
    error('do');
    error('do a');
    error('do a while();');
    error('do a;');
    error('do a;();');
    error('do a;while');
    error('do a;while(');
    error('do a;while();');
    error('do a;while(b');
    error('do a;while(b;');
    error('do a;while(b)');
    error('do a;while);');
    error('do;while();');
  });
});
