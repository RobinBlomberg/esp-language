import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMemberExpression } from './member-expression';

const { fail, ok } = createParseAssert(parseMemberExpression);

suite('MemberExpression', () => {
  test('"PrimaryExpression"', () => {
    ok('PrimaryExpression');
  });

  test('"MemberExpression [ Expression ]"', () => {
    ok('MemberExpression[Expression]');
    ok('a[b][c]');
    fail('MemberExpression[');
    fail('MemberExpression[Expression');
    fail('a[b][');
    fail('a[b][c');
  });

  test('"MemberExpression . IdentifierName"', () => {
    ok('MemberExpression.IdentifierName');
    ok('a.b.c');
    fail('MemberExpression.');
    fail('a.b.');
  });

  test('"new MemberExpression Arguments"', () => {
    ok('new MemberExpression()');
    fail('new');
    fail('new MemberExpression');
    fail('new MemberExpression(');
  });

  it('should be nestable', () => {
    ok('new new MemberExpression()()');
    fail('new new');
    fail('new new MemberExpression');
    fail('new new MemberExpression(');
    fail('new new MemberExpression()');
    fail('new new MemberExpression()(');
  });
});
