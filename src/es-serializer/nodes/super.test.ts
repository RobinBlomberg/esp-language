import { expect, suite, test } from 'vitest';
import { Super } from '../../es-ast';
import { serialize } from '../serialize';

suite('Super', () => {
  test('super', () => {
    expect(serialize(Super())).toBe('super');
  });
});
