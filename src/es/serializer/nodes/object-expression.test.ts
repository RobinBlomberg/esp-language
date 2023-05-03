import { expect, suite, test } from 'vitest';
import {
  FunctionBody,
  FunctionExpression,
  Identifier,
  ObjectExpression,
  Property,
  SpreadElement,
} from '../../ast';
import { serialize } from '../serialize';

suite('ObjectExpression', () => {
  test('{ }', () => {
    expect(serialize(ObjectExpression([]))).toBe('{}');
  });

  suite('{ PropertyDefinitionList[?Yield, ?Await] }', () => {
    suite('PropertyDefinitionList[?Yield, ?Await]', () => {
      test('PropertyDefinition[?Yield, ?Await]', () => {
        expect(
          serialize(
            ObjectExpression([
              Property(
                Identifier('a'),
                Identifier('b'),
                'init',
                false,
                false,
                false,
              ),
            ]),
          ),
        ).toBe('{a:b}');
      });

      test('PropertyDefinitionList[?Yield, ?Await] , PropertyDefinition[?Yield, ?Await]', () => {
        expect(
          serialize(
            ObjectExpression([
              Property(
                Identifier('a'),
                Identifier('b'),
                'init',
                false,
                false,
                false,
              ),
              SpreadElement(Identifier('c')),
              Property(
                Identifier('d'),
                FunctionExpression(null, [], FunctionBody([]), true, true),
                'init',
                true,
                false,
                false,
              ),
              Property(
                Identifier('e'),
                Identifier('f'),
                'init',
                false,
                false,
                true,
              ),
            ]),
          ),
        ).toBe('{a:b,...c,async*d(){},[e]:f}');
      });
    });
  });
});
