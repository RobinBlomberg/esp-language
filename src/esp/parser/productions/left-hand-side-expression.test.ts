import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseLeftHandSideExpression } from './left-hand-side-expression';

const { error, ok, unused } = createParseAssert(parseLeftHandSideExpression);

suite('LeftHandSideExpression', () => {
  test(/* s */ `PrimaryExpression`, () => {
    unused();
    ok('(1+2)');
    ok('a');
    ok('a.b');
    ok('a.b()');
    ok('a[b]');
  });

  test(/* s */ `PrimaryExpression`, () => {
    unused();
    ok('(1+2)');
    ok('a');
  });

  test(/* s */ `LeftHandSideExpression '[' Expression ']'`, () => {
    ok('a[b]');
    ok('a[b][c]');
    error('a[');
    error('a[b');
    error('a[b][');
    error('a[b][c');
  });

  test(/* s */ `LeftHandSideExpression '.' IdentifierName`, () => {
    ok('a.b');
    ok('a.b.c');
    ok('a().b');
    error('a.');
    error('a.b.');
  });

  test(/* s */ `LeftHandSideExpression Arguments`, () => {
    ok('a()');
    ok('a()()');
    ok('a(b,c)');
    ok('a(b)');
    ok('new a().b');
    ok('new a().b[c]()');
    ok('new a()()');
    ok('new(a())().b');
    error('a(');
    error('a()(');
    error('a(b,');
    error('a(b,c');
  });

  test(/* s */ `'new' LeftHandSideExpression Arguments`, () => {
    ok('new a.b()');
    ok('new a.b(c,d)');
    ok('new a.b(c)');
    ok('new a.b[c]()');
    ok('new a()');
    ok('new new a.b()()');
    ok('new new a.b[c]()()');
    ok('new new a().b()');
    ok('new new a().b[c]()');
    ok('new new a()()');
    ok('new(a.b)()');
    ok('new(a.b[c])()');
    ok('new(a().b)()');
    ok('new(a().b[c])()');
    ok('new(a())()');
    ok('new(a)()');
    ok('new(new a.b())()');
    ok('new(new a.b[c]())()');
    ok('new(new a().b)()');
    ok('new(new a().b[c])()');
    ok('new(new a())()');
    error('new');
    error('new a');
    error('new a(');
    error('new new');
    error('new new a');
    error('new new a.b()');
    error('new new a.b[c]()');
    error('new new a(');
    error('new new a()');
    error('new new a()');
    error('new new a().b');
    error('new new a()(');
  });
});
