import { expect, it, suite, test } from 'vitest';
import { CallExpression, Identifier, NewExpression } from '../../es-ast';
import { serialize } from '../serialize';

suite('NewExpression', () => {
  test('new MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]', () => {
    expect(serialize(NewExpression(Identifier('Error'), []))).toBe(
      'new Error()',
    );
  });

  it('should parenthesize when needed', () => {
    expect(
      serialize(NewExpression(CallExpression(Identifier('a'), [], false), [])),
    ).toBe('new(a())()');
  });
});
