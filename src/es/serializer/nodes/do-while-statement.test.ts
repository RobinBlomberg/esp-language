import { expect, suite, test } from 'vitest';
import { DoWhileStatement, ExpressionStatement, Identifier } from '../../ast';
import { serialize } from '../serialize';

suite('DoWhileStatement', () => {
  test('do Statement[?Yield, ?Await, ?Return] while ( Expression[+In, ?Yield, ?Await] ) ;', () => {
    expect(
      serialize(
        DoWhileStatement(ExpressionStatement(Identifier('a')), Identifier('b')),
      ),
    ).toBe('do a;while(b);');
  });
});
