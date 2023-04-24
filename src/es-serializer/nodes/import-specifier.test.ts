import { expect, suite, test } from 'vitest';
import { Identifier, ImportSpecifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('ImportSpecifier', () => {
  test('ImportedBinding', () => {
    expect(serialize(ImportSpecifier(Identifier('a'), Identifier('a')))).toBe(
      'a',
    );
  });

  test('ModuleExportName as ImportedBinding', () => {
    expect(serialize(ImportSpecifier(Identifier('a'), Identifier('b')))).toBe(
      'a as b',
    );
  });
});
