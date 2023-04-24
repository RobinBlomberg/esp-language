import { expect, suite, test } from 'vitest';
import { Identifier, ImportNamespaceSpecifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('ImportNamespaceSpecifier', () => {
  test('* as ImportedBinding', () => {
    expect(serialize(ImportNamespaceSpecifier(Identifier('a')))).toBe('*as a');
  });
});
