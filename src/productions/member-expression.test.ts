import { it, suite, test } from 'vitest';
import {
  computedMemberExpression,
  identifier,
  newExpression,
  staticMemberExpression,
} from '../node-factory';
import { createParseAssert } from '../test-utils';
import { parseMemberExpression } from './member-expression';

const { ok } = createParseAssert(parseMemberExpression);

suite('MemberExpression', () => {
  test('Identifier', () => {
    ok(' a ', identifier(1, 2, 'a'));
  });

  suite('StaticMemberExpression', () => {
    it('should handle non-nested member expressions', () => {
      ok(
        ' a.b ',
        staticMemberExpression(
          1,
          4,
          identifier(1, 2, 'a'),
          identifier(3, 4, 'b'),
        ),
      );
    });

    it('should handle nested member expressions', () => {
      ok(
        'a.b.c',
        staticMemberExpression(
          0,
          5,
          staticMemberExpression(
            0,
            3,
            identifier(0, 1, 'a'),
            identifier(2, 3, 'b'),
          ),
          identifier(4, 5, 'c'),
        ),
      );
    });
  });

  test('ComputedMemberExpression', () => {
    ok(
      ' a[b] ',
      computedMemberExpression(
        1,
        5,
        identifier(1, 2, 'a'),
        identifier(3, 4, 'b'),
      ),
    );
  });

  suite('NewExpression', () => {
    it('should handle non-nested new expressions', () => {
      ok(
        'new a.b.c(d, e)',
        newExpression(
          0,
          15,
          staticMemberExpression(
            4,
            9,
            staticMemberExpression(
              4,
              7,
              identifier(4, 5, 'a'),
              identifier(6, 7, 'b'),
            ),
            identifier(8, 9, 'c'),
          ),
          [identifier(10, 11, 'd'), identifier(13, 14, 'e')],
        ),
      );
    });

    it('should handle nested new expressions', () => {
      ok(
        'new new a()()',
        newExpression(
          0,
          13,
          newExpression(4, 11, identifier(8, 9, 'a'), []),
          [],
        ),
      );
    });
  });
});
