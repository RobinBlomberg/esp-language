import { describe, it, suite, test } from 'vitest';
import {
  Arguments,
  ComputedMemberExpression,
  Identifier,
  NewExpression,
  StaticMemberExpression,
} from '../ast';
import { createParseAssert } from '../test-utils';
import { parseMemberExpression } from './member-expression';

const { fail, ok } = createParseAssert(parseMemberExpression);

suite('MemberExpression', () => {
  test('"PrimaryExpression"', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
    fail(' ');
  });

  test('"MemberExpression [ Expression ]"', () => {
    ok(
      'a[b]',
      ComputedMemberExpression(
        0,
        4,
        Identifier(0, 1, 'a'),
        Identifier(2, 3, 'b'),
      ),
    );
    fail('a[');
    fail('a[b');
  });

  suite('"MemberExpression . IdentifierName"', () => {
    it('should handle non-nested member expressions', () => {
      ok(
        'a.b',
        StaticMemberExpression(
          0,
          3,
          Identifier(0, 1, 'a'),
          Identifier(2, 3, 'b'),
        ),
      );
      fail('a.');
    });

    it('should handle nested member expressions', () => {
      ok(
        'a.b.c',
        StaticMemberExpression(
          0,
          5,
          StaticMemberExpression(
            0,
            3,
            Identifier(0, 1, 'a'),
            Identifier(2, 3, 'b'),
          ),
          Identifier(4, 5, 'c'),
        ),
      );
      fail('a.b.');
    });
  });

  describe('"new MemberExpression Arguments"', () => {
    it('should handle non-nested new expressions', () => {
      ok(
        'new a.b.c(d, e)',
        NewExpression(
          0,
          15,
          StaticMemberExpression(
            4,
            9,
            StaticMemberExpression(
              4,
              7,
              Identifier(4, 5, 'a'),
              Identifier(6, 7, 'b'),
            ),
            Identifier(8, 9, 'c'),
          ),
          Arguments(9, 15, [Identifier(10, 11, 'd'), Identifier(13, 14, 'e')]),
        ),
      );
      fail('new');
      fail('new a');
      fail('new a.');
      fail('new a.b');
      fail('new a.b.');
      fail('new a.b.c');
      fail('new a.b.c(');
      fail('new a.b.c(d');
      fail('new a.b.c(d,');
      fail('new a.b.c(d, e');
    });

    it('should handle nested new expressions', () => {
      ok(
        'new new a()()',
        NewExpression(
          0,
          13,
          NewExpression(4, 11, Identifier(8, 9, 'a'), Arguments(9, 11, [])),
          Arguments(11, 13, []),
        ),
      );
      fail('new new');
      fail('new new a');
      fail('new new a(');
      fail('new new a()');
      fail('new new a()(');
    });
  });
});
