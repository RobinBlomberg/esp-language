import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMemberExpression } from './member-expression';

const { error, ok, unused } = createParseAssert(parseMemberExpression);

suite('MemberExpression', () => {
  test('"PrimaryExpression"', () => {
    unused();
    ok('PrimaryExpression');
    ok('(1+2)');
  });

  test('"MemberExpression [ Expression ]"', () => {
    ok('MemberExpression[Expression]');
    ok('a[b][c]');
    error('MemberExpression[');
    error('MemberExpression[Expression');
    error('a[b][');
    error('a[b][c');
  });

  test('"MemberExpression . IdentifierName"', () => {
    ok('MemberExpression.IdentifierName');
    ok('a.b.c');
    error('MemberExpression.');
    error('a.b.');
  });

  test('"new MemberExpression Arguments"', () => {
    ok('new MemberExpression()');
    error('new');
    error('new MemberExpression');
    error('new MemberExpression(');
  });

  it('should be nestable', () => {
    ok('new new MemberExpression()()');
    error('new new');
    error('new new MemberExpression');
    error('new new MemberExpression(');
    error('new new MemberExpression()');
    error('new new MemberExpression()(');
  });
});
