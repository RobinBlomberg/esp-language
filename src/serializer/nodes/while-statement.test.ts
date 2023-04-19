import { expect, suite, test } from 'vitest';
import { ExpressionStatement, Identifier, WhileStatement } from '../../estree';
import { serialize } from '../write';

suite('WhileStatement', () => {
  test('while ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]', () => {
    expect(
      serialize(
        WhileStatement(Identifier('a'), ExpressionStatement(Identifier('b'))),
      ),
    ).toBe('while(a)b;');
  });
});
