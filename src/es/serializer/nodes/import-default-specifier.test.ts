import { expect, suite, test } from 'vitest';
import { Identifier, ImportDefaultSpecifier } from '../../ast';
import { serialize } from '../serialize';

suite('ImportDefaultSpecifier', () => {
  suite('ImportedBinding', () => {
    suite('BindingIdentifier[~Yield, +Await]', () => {
      test('Identifier', () => {
        expect(serialize(ImportDefaultSpecifier(Identifier('a')))).toBe('a');
      });

      test('yield', () => {
        expect(serialize(ImportDefaultSpecifier(Identifier('yield')))).toBe(
          'yield',
        );
      });

      test('await', () => {
        expect(serialize(ImportDefaultSpecifier(Identifier('await')))).toBe(
          'await',
        );
      });
    });
  });
});
