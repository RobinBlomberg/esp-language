import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';

const { error, ok, unused } = createParseAssert(parseLeftHandSideExpression);

suite('LeftHandSideExpression', () => {
  test(/* s */ `NewExpression`, () => {
    unused();
    ok('a');
    ok('a.b');
    ok('a[b]');
    ok('(1+2)');
  });

  test(/* s */ `CallExpression`, () => {
    ok('a()');
    ok('a(b)');
    ok('a(b,c)');
    ok('a()()');
    error('a(');
    error('a(b,');
    error('a(b,c');
    error('a()(');
  });
});
