import { expect, it, suite, test } from 'vitest';
import {
  AwaitExpression,
  BinaryExpression,
  CallExpression,
  Identifier,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('AwaitExpression', () => {
  test('await UnaryExpression[?Yield, +Await] ;', () => {
    expect(
      serialize(AwaitExpression(CallExpression(Identifier('a'), [], false))),
    ).toBe('await a()');
  });

  it('should parenthesize when needed', () => {
    expect(
      serialize(
        AwaitExpression(
          BinaryExpression('+', Identifier('a'), Identifier('b')),
        ),
      ),
    ).toBe('await(a+b)');
  });
});
