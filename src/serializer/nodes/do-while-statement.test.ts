import { expect, suite, test } from 'vitest';
import {
  DoWhileStatement,
  ExpressionStatement,
  Identifier,
} from '../../estree';
import { serialize } from '../write';

suite('DoWhileStatement', () => {
  test('do Statement[?Yield, ?Await, ?Return] while ( Expression[+In, ?Yield, ?Await] ) ;', () => {
    expect(
      serialize(
        DoWhileStatement(ExpressionStatement(Identifier('a')), Identifier('b')),
      ),
    ).toBe('do a;while(b);');
  });
});
