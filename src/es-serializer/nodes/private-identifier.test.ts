import { expect, suite, test } from 'vitest';
import { PrivateIdentifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('PrivateIdentifier', () => {
  test('# IdentifierName', () => {
    expect(serialize(PrivateIdentifier('abc'))).toBe('#abc');
  });
});
