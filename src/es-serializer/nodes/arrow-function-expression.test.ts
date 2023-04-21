import { expect, suite, test } from 'vitest';
import {
  ArrayPattern,
  ArrowFunctionExpression,
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
              ObjectExpression([]),
              false,
              false,
            ),
          ),
        ).toBe('(a)=>{}');
      });

      test('( )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(
              null,
              [],
              ObjectExpression([]),
              false,
              false,
            ),
          ),
        ).toBe('()=>{}');
      });

      test('( ... BindingIdentifier[?Yield, ?Await] )', () => {
        expect(
          serialize(
            ArrowFunctionExpression(
              null,
              [RestElement(Identifier('a'))],
              ObjectExpression([]),
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
              ObjectExpression([]),
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
              ObjectExpression([]),
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
              ObjectExpression([]),
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
        ArrowFunctionExpression(null, [], ObjectExpression([]), true, false),
      ),
    ).toBe('async()=>{}');
  });
});
