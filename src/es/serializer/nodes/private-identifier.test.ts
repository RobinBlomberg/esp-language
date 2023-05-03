import { expect, suite, test } from 'vitest';
import { PrivateIdentifier } from '../../ast';
import { serialize } from '../serialize';

suite('PrivateIdentifier', () => {
  test('# IdentifierName', () => {
    expect(serialize(PrivateIdentifier('abc'))).toBe('#abc');
  });
});
