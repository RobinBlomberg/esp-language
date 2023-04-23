import { expect, suite, test } from 'vitest';
import { ClassBody, ClassDeclaration, Identifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('ClassDeclaration', () => {
  test('ClassDeclaration[?Yield, ?Await]', () => {
    expect(
      serialize(ClassDeclaration(Identifier('A'), null, ClassBody([]))),
    ).toBe('class A{}');
  });

  test('ClassDeclaration[?Yield, ?Await] with extends', () => {
    expect(
      serialize(
        ClassDeclaration(Identifier('A'), Identifier('B'), ClassBody([])),
      ),
    ).toBe('class A extends B{}');
  });
});
