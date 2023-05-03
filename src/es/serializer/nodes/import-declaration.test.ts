import { expect, suite, test } from 'vitest';
import {
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  Literal,
} from '../../ast';
import { serialize } from '../serialize';

suite('ImportDeclaration', () => {
  suite('import ImportClause FromClause ;', () => {
    suite('ImportedDefaultBinding', () => {
      suite('ImportedBinding', () => {
        test('BindingIdentifier[~Yield, +Await]', () => {
          expect(
            serialize(
              ImportDeclaration(
                [ImportDefaultSpecifier(Identifier('a'))],
                Literal('b'),
              ),
            ),
          ).toBe('import a from"b";');
        });
      });
    });

    suite('NameSpaceImport', () => {
      test('* as ImportedBinding', () => {
        expect(
          serialize(
            ImportDeclaration(
              [ImportNamespaceSpecifier(Identifier('a'))],
              Literal('b'),
            ),
          ),
        ).toBe('import*as a from"b";');
      });
    });

    suite('NamedImports', () => {
      suite('{ ImportsList }', () => {
        suite('ImportsList', () => {
          test('ImportSpecifier', () => {
            expect(
              serialize(
                ImportDeclaration(
                  [ImportSpecifier(Identifier('a'), Identifier('a'))],
                  Literal('b'),
                ),
              ),
            ).toBe('import{a}from"b";');
          });

          test('ImportsList , ImportSpecifier', () => {
            expect(
              serialize(
                ImportDeclaration(
                  [
                    ImportSpecifier(Identifier('a'), Identifier('b')),
                    ImportSpecifier(Identifier('c'), Identifier('c')),
                  ],
                  Literal('d'),
                ),
              ),
            ).toBe('import{a as b,c}from"d";');
          });
        });
      });
    });

    test('ImportedDefaultBinding , NameSpaceImport', () => {
      expect(
        serialize(
          ImportDeclaration(
            [
              ImportDefaultSpecifier(Identifier('a')),
              ImportNamespaceSpecifier(Identifier('b')),
            ],
            Literal('c'),
          ),
        ),
      ).toBe('import a,*as b from"c";');
    });

    test('ImportedDefaultBinding , NamedImports', () => {
      expect(
        serialize(
          ImportDeclaration(
            [
              ImportDefaultSpecifier(Identifier('a')),
              ImportSpecifier(Identifier('b'), Identifier('c')),
              ImportSpecifier(Identifier('d'), Identifier('d')),
            ],
            Literal('e'),
          ),
        ),
      ).toBe('import a,{b as c,d}from"e";');
    });
  });

  test('import ModuleSpecifier ;', () => {
    expect(serialize(ImportDeclaration([], Literal('b')))).toBe('import"b";');
  });
});
