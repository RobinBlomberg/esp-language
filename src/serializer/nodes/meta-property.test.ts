import { expect, suite, test } from 'vitest';
import { Identifier, MetaProperty } from '../../estree';
import { serialize } from '../write';

suite('MetaProperty', () => {
  test('NewTarget', () => {
    expect(
      serialize(MetaProperty(Identifier('new'), Identifier('target'))),
    ).toBe('new.target');
  });

  test('ImportMeta', () => {
    expect(
      serialize(MetaProperty(Identifier('import'), Identifier('meta'))),
    ).toBe('import.meta');
  });
});
