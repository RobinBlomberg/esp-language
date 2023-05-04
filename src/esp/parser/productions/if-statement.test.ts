import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIfStatement } from './if-statement';

const { error, ok, unused } = createParseAssert(parseIfStatement);

suite('IfStatement', () => {
  test(/* s */ `'if' '(' Expression ')' Statement`, () => {
    unused();
    ok('if(a)b;');
    ok('if(a())b;');
    error('if');
    error('if(');
    error('if(a');
    error('if(a)');
    error('if(a);');
    error('if(a)b');
  });

  test(/* s */ `'if' '(' Expression ')' Statement 'else' Statement`, () => {
    ok('if(a)b;else c;');
    error('if(a)b;else');
    error('if(a)b;else;');
    error('if(a)b;else c');
  });

  it('should be nestable', () => {
    ok('if(a)b;else if(c)d;else e;');
    error('if(a)b;else if(c)d;else');
    error('if(a)b;else if(c)d;else;');
    error('if(a)b;else if(c)d;else e');
  });
});
