import { it, suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMemberExpression } from './member-expression';

const { error, ok, unused } = createParseAssert(parseMemberExpression);

suite('MemberExpression', () => {
  test(/* s */ `PrimaryExpression`, () => {
    unused();
    ok('a');
    ok('(1+2)');
  });

  test(/* s */ `MemberExpression '[' Expression ']'`, () => {
    ok('a[b]');
    ok('a[b][c]');
    error('a[');
    error('a[b');
    error('a[b][');
    error('a[b][c');
  });

  test(/* s */ `MemberExpression '.' IdentifierName`, () => {
    ok('a.b');
    ok('a.b.c');
    error('a.');
    error('a.b.');
  });

  test(/* s */ `'new' MemberExpression Arguments`, () => {
    ok('new a()');
    error('new');
    error('new a');
    error('new a(');
  });

  it('should be nestable', () => {
    ok('new new a()()');
    error('new new');
    error('new new a');
    error('new new a(');
    error('new new a()');
    error('new new a()(');
  });
});
