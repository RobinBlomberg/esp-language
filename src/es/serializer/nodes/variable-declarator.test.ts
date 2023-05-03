import { expect, suite, test } from 'vitest';
import { ArrayPattern, Identifier, VariableDeclarator } from '../../ast';
import { serialize } from '../serialize';

suite('VariableDeclarator', () => {
  test('BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]<opt>', () => {
    expect(serialize(VariableDeclarator(Identifier('a'), null))).toBe('a');
    expect(
      serialize(VariableDeclarator(Identifier('a'), Identifier('b'))),
    ).toBe('a=b');
  });

  test('BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]', () => {
    expect(
      serialize(
        VariableDeclarator(ArrayPattern([Identifier('a')]), Identifier('b')),
      ),
    ).toBe('[a]=b');
  });
});
