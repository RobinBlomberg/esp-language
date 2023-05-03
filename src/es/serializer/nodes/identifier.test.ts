import { expect, suite, test } from 'vitest';
import { Identifier } from '../../ast';
import { serialize } from '../serialize';

suite('Identifier', () => {
  test('IdentifierName but not ReservedWord', () => {
    expect(serialize(Identifier('abc'))).toBe('abc');
  });
});
