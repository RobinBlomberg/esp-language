import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';

const { error, ok, unused } = createParseAssert(parseLeftHandSideExpression);

suite('LeftHandSideExpression', () => {
  test('"NewExpression"', () => {
    unused();
    ok('NewExpression');
    ok('Member.Expression');
    ok('Member[Expression]');
  });

  test('"CallExpression"', () => {
    ok('CallExpression()');
    ok('CallExpression(a)');
    ok('CallExpression(a, b)');
    ok('CallExpression()()');
    error('CallExpression(');
    error('CallExpression(a,');
    error('CallExpression(a, b');
    error('CallExpression()(');
  });
});
