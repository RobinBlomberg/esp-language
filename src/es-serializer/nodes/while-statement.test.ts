import { expect, suite, test } from 'vitest';
import { ExpressionStatement, Identifier, WhileStatement } from '../../es-ast';
import { serialize } from '../serialize';

suite('WhileStatement', () => {
  test('while ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]', () => {
    expect(
      serialize(
        WhileStatement(Identifier('a'), ExpressionStatement(Identifier('b'))),
      ),
    ).toBe('while(a)b;');
  });
});
