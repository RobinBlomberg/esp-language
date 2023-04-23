import { expect, suite, test } from 'vitest';
import { Identifier, NewExpression, ThrowStatement } from '../../es-ast';
import { serialize } from '../serialize';

suite('ThrowStatement', () => {
  test('throw [no LineTerminator here] Expression[+In, ?Yield, ?Await] ;', () => {
    expect(
      serialize(ThrowStatement(NewExpression(Identifier('Error'), []))),
    ).toBe('throw new Error();');
  });
});
