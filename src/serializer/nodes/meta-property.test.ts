import { expect, suite, test } from 'vitest';
import { Identifier, MetaProperty } from '../../estree';
import { serialize } from '../write';

suite('MetaProperty', () => {
  suite('NewTarget', () => {
    test('new . target', () => {
      expect(
        serialize(MetaProperty(Identifier('new'), Identifier('target'))),
      ).toBe('new.target');
    });
  });

  suite('ImportMeta', () => {
    test('import . meta', () => {
      expect(
        serialize(MetaProperty(Identifier('import'), Identifier('meta'))),
      ).toBe('import.meta');
    });
  });
});
