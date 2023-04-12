import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';

const { fail, ok } = createParseAssert(parseLeftHandSideExpression);

suite('LeftHandSideExpression', () => {
  test('"NewExpression"', () => {
    ok('NewExpression');
    ok('Member.Expression');
    ok('Member[Expression]');
  });

  test('"CallExpression"', () => {
    ok('CallExpression()');
    ok('CallExpression(a)');
    ok('CallExpression(a, b)');
    ok('CallExpression()()');
    fail('CallExpression(');
    fail('CallExpression(a,');
    fail('CallExpression(a, b');
    fail('CallExpression()(');
  });
});
