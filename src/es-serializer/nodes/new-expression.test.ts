import { expect, suite, test } from 'vitest';
import { Identifier, NewExpression } from '../../es-ast';
import { serialize } from '../serialize';

suite('NewExpression', () => {
  test('new MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]', () => {
    expect(serialize(NewExpression(Identifier('Error'), []))).toBe(
      'new Error()',
    );
  });
});
