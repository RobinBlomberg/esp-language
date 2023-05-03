import { expect, suite, test } from 'vitest';
import { ClassBody, ClassExpression, Identifier } from '../../ast';
import { serialize } from '../serialize';

suite('ClassExpression', () => {
  test('class BindingIdentifier[?Yield, ?Await]<opt> ClassTail[?Yield, ?Await]', () => {
    expect(
      serialize(ClassExpression(Identifier('A'), null, ClassBody([]))),
    ).toBe('class A{}');
    expect(
      serialize(
        ClassExpression(Identifier('A'), Identifier('B'), ClassBody([])),
      ),
    ).toBe('class A extends B{}');
  });
});
