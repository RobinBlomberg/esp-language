import { expect, suite, test } from 'vitest';
import { ExportAllDeclaration, Identifier, Literal } from '../../es-ast';
import { serialize } from '../serialize';

suite('ExportAllDeclaration', () => {
  suite('export ExportFromClause FromClause ;', () => {
    suite('ExportFromClause', () => {
      test('*', () => {
        expect(serialize(ExportAllDeclaration(null, Literal('a')))).toBe(
          'export*from"a";',
        );
      });

      suite('* as ModuleExportName', () => {
        test('IdentifierName', () => {
          expect(
            serialize(ExportAllDeclaration(Identifier('a'), Literal('b'))),
          ).toBe('export*as a from"b";');
        });

        test('StringLiteral', () => {
          expect(
            serialize(ExportAllDeclaration(Literal('a'), Literal('b'))),
          ).toBe('export*as"a"from"b";');
        });
      });
    });
  });
});
