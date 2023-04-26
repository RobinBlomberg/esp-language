import { expect, it, suite, test } from 'vitest';
import {
  ArrayPattern,
  ArrowFunctionExpression,
  BlockStatement,
  Identifier,
  ObjectExpression,
  RestElement,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('ArrayFunctionExpression', () => {
  suite(
    'CoverParenthesizedExpressionAndArrowParameterList[Yield, Await]',
    () => {
      test('( Expression[+In, ?Yield, ?Await] )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(
              null,
              [Identifier('a')],
              BlockStatement([]),
              false,
              false,
            ),
          ),
        ).toBe('(a)=>{}');
      });

      test('( )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(null, [], BlockStatement([]), false, false),
          ),
        ).toBe('()=>{}');
      });

      test('( ... BindingIdentifier[?Yield, ?Await] )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(
              null,
              [RestElement(Identifier('a'))],
              BlockStatement([]),
              false,
              false,
            ),
          ),
        ).toBe('(...a)=>{}');
      });

      test('( ... BindingPattern[?Yield, ?Await] )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(
              null,
              [RestElement(ArrayPattern([]))],
              BlockStatement([]),
              false,
              false,
            ),
          ),
        ).toBe('(...[])=>{}');
      });

      test('( Expression[+In, ?Yield, ?Await] , ... BindingIdentifier[?Yield, ?Await] )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(
              null,
              [Identifier('a'), RestElement(Identifier('b'))],
              BlockStatement([]),
              false,
              false,
            ),
          ),
        ).toBe('(a,...b)=>{}');
      });

      test('( Expression[+In, ?Yield, ?Await] , ... BindingPattern[?Yield, ?Await] )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(
              null,
              [Identifier('a'), RestElement(ArrayPattern([]))],
              BlockStatement([]),
              false,
              false,
            ),
          ),
        ).toBe('(a,...[])=>{}');
      });
    },
  );

  suite('ConciseBody[In]', () => {
    test('[lookahead ≠ {] ExpressionBody[?In, ~Await]', () => {
      expect(
        serialize(
          ArrowFunctionExpression(
            null,
            [Identifier('a')],
            Identifier('b'),
            false,
            false,
          ),
        ),
      ).toBe('(a)=>b');
    });
  });

  test('AsyncArrowFunction[In, Yield, Await]', () => {
    expect(
      serialize(
        ArrowFunctionExpression(null, [], BlockStatement([]), true, false),
      ),
    ).toBe('async()=>{}');
  });

  it('should wrap object expressions in parentheses', () => {
    expect(
      serialize(
        ArrowFunctionExpression(
          null,
          [Identifier('a')],
          ObjectExpression([]),
          false,
          false,
        ),
      ),
    ).toBe('(a)=>({})');
  });
});
