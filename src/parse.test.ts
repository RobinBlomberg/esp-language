import { expect, it, suite, test } from 'vitest';
import * as ast from './node-factory';
import { Node } from './nodes';
import {
  parseArrayLiteral,
  parseIdentifier,
  parseLiteral,
  parseMemberExpression,
  parseObjectLiteral,
  parsePrimaryExpression,
} from './parse';

const createParser = <T extends Node>(
  parse: (data: string, i: number) => T | null,
) => ({
  fail: (data: string) => {
    expect(parse(data, 0)).toBeNull();
  },
  ok: (data: string, expected: T) => {
    expect(parse(data, 0)).toEqual(expected);
  },
});

const is = {
  arrayLiteral: createParser(parseArrayLiteral),
  identifier: createParser(parseIdentifier),
  literal: createParser(parseLiteral),
  memberExpression: createParser(parseMemberExpression),
  objectLiteral: createParser(parseObjectLiteral),
  primaryExpression: createParser(parsePrimaryExpression),
};

suite('parse', () => {
  test('Literal', () => {
    is.literal.ok(' false ', ast.literal(1, 6, false));
    is.literal.ok('Infinity', ast.literal(0, 8, Infinity));
    is.literal.ok('NaN', ast.literal(0, 3, NaN));
    is.literal.ok('null', ast.literal(0, 4, null));
    is.literal.ok('true', ast.literal(0, 4, true));
    is.literal.ok('undefined', ast.literal(0, 9, undefined));
    is.literal.ok('0.123', ast.literal(0, 5, 0.123));
    is.literal.ok('"ab\\"cd"', ast.literal(0, 8, 'ab"cd'));
    is.literal.fail('falsey');
  });

  test('Identifier', () => {
    is.identifier.ok(' falsey ', ast.identifier(1, 7, 'falsey'));
    is.identifier.fail('false');
  });

  test('PrimaryExpression', () => {
    is.primaryExpression.ok('false', ast.literal(0, 5, false));
    is.primaryExpression.ok('Infinity', ast.literal(0, 8, Infinity));
    is.primaryExpression.ok('NaN', ast.literal(0, 3, NaN));
    is.primaryExpression.ok('null', ast.literal(0, 4, null));
    is.primaryExpression.ok('true', ast.literal(0, 4, true));
    is.primaryExpression.ok('undefined', ast.literal(0, 9, undefined));
    is.primaryExpression.ok('0.123', ast.literal(0, 5, 0.123));
    is.primaryExpression.ok('"ab\\"cd"', ast.literal(0, 8, 'ab"cd'));
    is.primaryExpression.ok('falsey', ast.identifier(0, 6, 'falsey'));
  });

  test('ArrayLiteral', () => {
    is.arrayLiteral.ok(' [] ', ast.arrayLiteral(1, 3, []));
    is.arrayLiteral.ok('[1]', ast.arrayLiteral(0, 3, [ast.literal(1, 2, 1)]));
    is.arrayLiteral.ok(
      '[1, 2]',
      ast.arrayLiteral(0, 6, [ast.literal(1, 2, 1), ast.literal(4, 5, 2)]),
    );
    is.arrayLiteral.fail('[');
    is.arrayLiteral.fail('[1,');
    is.arrayLiteral.fail('[1,]');
    is.arrayLiteral.fail('[1, 2');
    is.arrayLiteral.fail('[1 2]');
    is.arrayLiteral.fail('[,]');
    is.arrayLiteral.fail('[, 2]');
  });

  test('ObjectLiteral', () => {
    is.objectLiteral.ok(' {} ', ast.objectLiteral(1, 3, []));
    is.objectLiteral.ok(
      '{a: 1}',
      ast.objectLiteral(0, 6, [
        ast.property(1, 5, ast.identifier(1, 2, 'a'), ast.literal(4, 5, 1)),
      ]),
    );
    is.objectLiteral.ok(
      '{a: 1, b: 2}',
      ast.objectLiteral(0, 12, [
        ast.property(1, 5, ast.identifier(1, 2, 'a'), ast.literal(4, 5, 1)),
        ast.property(7, 11, ast.identifier(7, 8, 'b'), ast.literal(10, 11, 2)),
      ]),
    );
    is.objectLiteral.fail('{');
    is.objectLiteral.fail('{a');
    is.objectLiteral.fail('{a:');
    is.objectLiteral.fail('{a: 1');
    is.objectLiteral.fail('{a: 1,');
    is.objectLiteral.fail('{a: 1, b');
    is.objectLiteral.fail('{a: 1, b:');
    is.objectLiteral.fail('{a: 1, b: 2');
    is.objectLiteral.fail('{a: 1,}');
    is.objectLiteral.fail('{a: }');
    is.objectLiteral.fail('{a}');
    is.objectLiteral.fail('{, b: 2}');
  });

  suite('MemberExpression', () => {
    test('Identifier', () => {
      is.memberExpression.ok(' a ', ast.identifier(1, 2, 'a'));
    });

    suite('StaticMemberExpression', () => {
      it('should handle non-nested member expressions', () => {
        is.memberExpression.ok(
          ' a.b ',
          ast.staticMemberExpression(
            1,
            4,
            ast.identifier(1, 2, 'a'),
            ast.identifier(3, 4, 'b'),
          ),
        );
      });

      it('should handle nested member expressions', () => {
        is.memberExpression.ok(
          'a.b.c',
          ast.staticMemberExpression(
            0,
            5,
            ast.staticMemberExpression(
              0,
              3,
              ast.identifier(0, 1, 'a'),
              ast.identifier(2, 3, 'b'),
            ),
            ast.identifier(4, 5, 'c'),
          ),
        );
      });
    });

    test('ComputedMemberExpression', () => {
      is.memberExpression.ok(
        ' a[b] ',
        ast.computedMemberExpression(
          1,
          5,
          ast.identifier(1, 2, 'a'),
          ast.identifier(3, 4, 'b'),
        ),
      );
    });
  });
});
