import { expect, suite, test } from 'vitest';
import { Super } from '../../estree';
import { serialize } from '../write';

suite('Super', () => {
  test('super', () => {
    expect(serialize(Super())).toBe('super');
  });
});
