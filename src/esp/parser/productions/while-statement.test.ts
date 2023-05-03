import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseWhileStatement } from './while-statement';

const { error, ok, unused } = createParseAssert(parseWhileStatement);

suite('WhileStatement', () => {
  test(/* s */ `'while' '(' Expression ')' Statement`, () => {
    unused();
    ok('while(a)b;');
    error('while');
    error('while(');
    error('while(a');
    error('while(a)');
  });
});
