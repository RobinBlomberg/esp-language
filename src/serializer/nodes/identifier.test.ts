import { expect, suite, test } from 'vitest';
import { Identifier } from '../../estree';
import { serialize } from '../write';

suite('Identifier', () => {
  test('IdentifierName but not ReservedWord', () => {
    expect(serialize(Identifier('abc'))).toBe('abc');
  });
});
