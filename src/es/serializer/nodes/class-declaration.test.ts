import { expect, suite, test } from 'vitest';
import {
  AnonymousDefaultExportedClassDeclaration,
  ClassBody,
  ClassDeclaration,
  Identifier,
} from '../../ast';
import { serialize } from '../serialize';

suite('ClassDeclaration', () => {
  test('class BindingIdentifier[?Yield, ?Await] ClassTail[?Yield, ?Await]', () => {
    expect(
      serialize(ClassDeclaration(Identifier('A'), null, ClassBody([]))),
    ).toBe('class A{}');
    expect(
      serialize(
        ClassDeclaration(Identifier('A'), Identifier('B'), ClassBody([])),
      ),
    ).toBe('class A extends B{}');
  });

  suite('[+Default] class ClassTail[?Yield, ?Await]', () => {
    test('ClassHeritage[?Yield, ?Await]<opt> { ClassBody[?Yield, ?Await]<opt> }', () => {
      expect(
        serialize(
          AnonymousDefaultExportedClassDeclaration(null, ClassBody([])),
        ),
      ).toBe('class{}');
      expect(
        serialize(
          AnonymousDefaultExportedClassDeclaration(
            Identifier('A'),
            ClassBody([]),
          ),
        ),
      ).toBe('class extends A{}');
    });
  });
});
