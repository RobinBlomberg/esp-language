import { expect, suite, test } from 'vitest';
import {
  ClassBody,
  ClassDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  Identifier,
  Literal,
  VariableDeclaration,
  VariableDeclarator,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('ExportNamedDeclaration', () => {
  suite('export NamedExports ;', () => {
    suite('{ ExportsList }', () => {
      suite('ExportSpecifier', () => {
        suite('ModuleExportName', () => {
          test('IdentifierName', () => {
            expect(
              serialize(
                ExportNamedDeclaration(
                  null,
                  [ExportSpecifier(Identifier('a'), Identifier('a'))],
                  null,
                ),
              ),
            ).toBe('export{a};');
          });

          test('StringLiteral', () => {
            expect(
              serialize(
                ExportNamedDeclaration(
                  null,
                  [ExportSpecifier(Literal('a'), Literal('a'))],
                  null,
                ),
              ),
            ).toBe('export{"a"};');
          });
        });

        suite('ModuleExportName as ModuleExportName', () => {
          test('IdentifierName', () => {
            expect(
              serialize(
                ExportNamedDeclaration(
                  null,
                  [ExportSpecifier(Identifier('a'), Identifier('b'))],
                  null,
                ),
              ),
            ).toBe('export{a as b};');
          });

          test('StringLiteral', () => {
            expect(
              serialize(
                ExportNamedDeclaration(
                  null,
                  [ExportSpecifier(Literal('a'), Literal('b'))],
                  null,
                ),
              ),
            ).toBe('export{"a"as"b"};');
          });
        });
      });

      test('ExportsList , ExportSpecifier', () => {
        expect(
          serialize(
            ExportNamedDeclaration(
              null,
              [
                ExportSpecifier(Identifier('a'), Identifier('a')),
                ExportSpecifier(Literal('b'), Literal('c')),
              ],
              null,
            ),
          ),
        ).toBe('export{a,"b"as"c"};');
      });
    });
  });

  suite('export VariableStatement[~Yield, +Await]', () => {
    test('var VariableDeclarationList[+In, ?Yield, ?Await] ;', () => {
      expect(
        serialize(
          ExportNamedDeclaration(
            VariableDeclaration(
              [
                VariableDeclarator(Identifier('a'), null),
                VariableDeclarator(Identifier('b'), Identifier('c')),
              ],
              'var',
            ),
            [],
            null,
          ),
        ),
      ).toBe('export var a,b=c;');
    });
  });

  test('export Declaration[~Yield, +Await]', () => {
    expect(
      serialize(
        ExportNamedDeclaration(
          ClassDeclaration(Identifier('A'), null, ClassBody([])),
          [],
          null,
        ),
      ),
    ).toBe('export class A{}');
  });
});
