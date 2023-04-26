import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIfStatement } from './if-statement';

const { error, ok, unused } = createParseAssert(parseIfStatement);

suite('IfStatement', () => {
  test('"if ( Expression ) Statement"', () => {
    unused();
    ok('if (Expression) Statement;');
    error('if');
    error('if (');
    error('if (Expression');
    error('if (Expression)');
    error('if (Expression);');
    error('if (Expression) Statement');
  });

  test('"if ( Expression ) Statement else Statement"', () => {
    ok('if (Expression) Statement; else Statement;');
    error('if (Expression) Statement; else');
    error('if (Expression) Statement; else;');
    error('if (Expression) Statement; else Statement');
  });

  it('should be nestable', () => {
    ok('if (a) b; else if (c) d; else e;');
    error('if (a) b; else if (c) d; else');
    error('if (a) b; else if (c) d; else;');
    error('if (a) b; else if (c) d; else e');
  });
});
