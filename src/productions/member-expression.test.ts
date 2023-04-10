import { it, suite, test } from 'vitest';
import {
  ComputedMemberExpression,
  Identifier,
  NewExpression,
  StaticMemberExpression,
} from '../ast';
import { createParseAssert } from '../test-utils';
import { parseMemberExpression } from './member-expression';

const { ok } = createParseAssert(parseMemberExpression);

suite('MemberExpression', () => {
  test('Identifier', () => {
    ok(' a ', Identifier(1, 2, 'a'));
  });

  suite('StaticMemberExpression', () => {
    it('should handle non-nested member expressions', () => {
      ok(
        ' a.b ',
        StaticMemberExpression(
          1,
          4,
          Identifier(1, 2, 'a'),
          Identifier(3, 4, 'b'),
        ),
      );
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
    });
  });

  test('ComputedMemberExpression', () => {
    ok(
      ' a[b] ',
      ComputedMemberExpression(
        1,
        5,
        Identifier(1, 2, 'a'),
        Identifier(3, 4, 'b'),
      ),
    );
  });

  suite('NewExpression', () => {
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
          [Identifier(10, 11, 'd'), Identifier(13, 14, 'e')],
        ),
      );
    });

    it('should handle nested new expressions', () => {
      ok(
        'new new a()()',
        NewExpression(
          0,
          13,
          NewExpression(4, 11, Identifier(8, 9, 'a'), []),
          [],
        ),
      );
    });
  });
});
