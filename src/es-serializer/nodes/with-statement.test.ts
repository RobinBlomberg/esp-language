import { expect, suite, test } from 'vitest';
import { BlockStatement, Identifier, WithStatement } from '../../es-ast';
import { serialize } from '../serialize';

suite('WithStatement', () => {
  test('with ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]', () => {
    expect(serialize(WithStatement(Identifier('a'), BlockStatement([])))).toBe(
      'with(a){}',
    );
  });
});
