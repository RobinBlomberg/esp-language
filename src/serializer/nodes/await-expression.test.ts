import { expect, suite, test } from 'vitest';
import { AwaitExpression, CallExpression, Identifier } from '../../estree';
import { serialize } from '../write';

suite('AwaitExpression', () => {
  test('await UnaryExpression[?Yield, +Await] ;', () => {
    expect(
      serialize(AwaitExpression(CallExpression(Identifier('a'), [], false))),
    ).toBe('await a()');
  });
});
