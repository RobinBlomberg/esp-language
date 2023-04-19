import { expect, suite, test } from 'vitest';
import {
  ArrayPattern,
  ArrowFunctionExpression,
  Identifier,
  ObjectExpression,
  RestElement,
} from '../../estree';
import { serialize } from '../write';

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
              true,
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
              true,
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
              true,
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
              true,
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
              true,
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
              true,
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
            true,
          ),
        ),
      ).toBe('(a)=>b');
    });
  });
});
