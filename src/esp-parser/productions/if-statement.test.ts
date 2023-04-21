import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIfStatement } from './if-statement';

const { fail, ok } = createParseAssert(parseIfStatement);

suite('IfStatement', () => {
  test('"if ( Expression ) Statement"', () => {
    ok('if (Expression) Statement;');
    fail('if');
    fail('if (');
    fail('if (Expression');
    fail('if (Expression)');
    fail('if (Expression);');
    fail('if (Expression) Statement');
  });

  test('"if ( Expression ) Statement else Statement"', () => {
    ok('if (Expression) Statement; else Statement;');
    fail('if (Expression) Statement; else');
    fail('if (Expression) Statement; else;');
    fail('if (Expression) Statement; else Statement');
  });

  it('should be nestable', () => {
    ok('if (a) b; else if (c) d; else e;');
    fail('if (a) b; else if (c) d; else');
    fail('if (a) b; else if (c) d; else;');
    fail('if (a) b; else if (c) d; else e');
  });
});
