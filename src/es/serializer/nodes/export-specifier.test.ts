import { expect, suite, test } from 'vitest';
import { ExportSpecifier, Identifier, Literal } from '../../ast';
import { serialize } from '../serialize';

suite('ExportSpecifier', () => {
  suite('ModuleExportName', () => {
    test('IdentifierName', () => {
      expect(serialize(ExportSpecifier(Identifier('a'), Identifier('a')))).toBe(
        'a',
      );
    });

    test('StringLiteral', () => {
      expect(serialize(ExportSpecifier(Literal('a'), Literal('a')))).toBe(
        '"a"',
      );
    });
  });

  suite('ModuleExportName as ModuleExportName', () => {
    suite('ModuleExportName', () => {
      test('IdentifierName', () => {
        expect(
          serialize(ExportSpecifier(Identifier('a'), Identifier('b'))),
        ).toBe('a as b');
      });

      test('StringLiteral', () => {
        expect(serialize(ExportSpecifier(Literal('a'), Literal('b')))).toBe(
          '"a"as"b"',
        );
      });
    });
  });
});
