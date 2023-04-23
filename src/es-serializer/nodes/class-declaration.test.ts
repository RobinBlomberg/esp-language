import { expect, suite, test } from 'vitest';
import { ClassBody, ClassDeclaration, Identifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('ClassDeclaration', () => {
  test('class BindingIdentifier[?Yield, ?Await] ClassTail[?Yield, ?Await]', () => {
    expect(
      serialize(ClassDeclaration(Identifier('A'), null, ClassBody([]))),
    ).toBe('class A{}');
  });

  suite('[+Default] class ClassTail[?Yield, ?Await]', () => {
    test('ClassHeritage[?Yield, ?Await]<opt> { ClassBody[?Yield, ?Await]<opt> }', () => {
      expect(serialize(ClassDeclaration(null, null, ClassBody([])))).toBe(
        'class{}',
      );
      expect(
        serialize(ClassDeclaration(null, Identifier('A'), ClassBody([]))),
      ).toBe('class extends A{}');
    });
  });
});
