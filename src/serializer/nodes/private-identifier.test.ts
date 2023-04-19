import { expect, suite, test } from 'vitest';
import { PrivateIdentifier } from '../../estree';
import { serialize } from '../write';

suite('PrivateIdentifier', () => {
  test('# IdentifierName', () => {
    expect(serialize(PrivateIdentifier('abc'))).toBe('#abc');
  });
});
